import { Injectable, HttpService } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { parseString } from 'xml2js'
import Iconv from 'iconv'
//low: Best practice - разделять импорты по группам
// Interfaces
import { parsedXMLInterface } from './parsedXML.interface'
// Services
import { CurrencyService } from '../currency/currency.service'
// DTO
import { CurrencyDto } from '../currency/dto/index.dto'


@Injectable()
export class ParserService {
    constructor(
        @InjectQueue('queue-1') private parserQueue: Queue,
        private httpService: HttpService,
        private currencyService: CurrencyService
    ) {
    }

    async addJobToQueue() {
        await this.parserQueue.empty()
        // medium: Можно перенести в onModuleInit
        await this.parserQueue.add('getXMLURL', { xmlURL: 'http://www.cbr.ru/scripts/XML_daily.asp' }) // to run right after application started
        await this.parserQueue.add('getXMLURL',
            {
                xmlURL: 'http://www.cbr.ru/scripts/XML_daily.asp'
            },
            {
                repeat: {
                    cron: '* * * * *' // from new min started and every min after
                }
            })
    }

    async getXMLBuffer(url: string): Promise<any> {
        return (
            await this.httpService
                .get(url, { responseType: 'arraybuffer' })
                .toPromise()
        ).data
    }

    //low: Best practice - jsDoc для метода
    parseXML(xmlBuffer: string): Promise<Array<CurrencyDto>> {
        // medium: Iconv импортировать как описал выше либо если используешь последние фичи ts то можно импортировать прямо тут
        const conv = new Iconv('windows-1251', 'utf8')
        const xmlString = conv.convert(xmlBuffer).toString()


        return new Promise((resolve, reject) => {
            parseString(xmlString, function(err: any, res: any) {
                if (err) reject(err)

                const arr = res.ValCurs.Valute
                const list = arr.reduce(
                    (list: Array<CurrencyDto>, xmlObject: parsedXMLInterface) => {
                        const currency: CurrencyDto = {
                            id: xmlObject['$']['ID'],
                            numcode: xmlObject.NumCode[0],
                            charCode: xmlObject.CharCode[0],
                            nominal: xmlObject.Nominal[0],
                            name: xmlObject.Name[0],
                            value: xmlObject.Value[0]
                        }

                        list.push(currency)
                        return list
                    },
                    []
                )

                resolve(list)
            })
        })
    }

    //low: Best practice - jsDoc для метода
    async updateDBwithXML(currencyList: Array<CurrencyDto>): Promise<void> {
        await this.currencyService.removeAll()
        // medium предыдущий код не будет работать асинхронно, итерировать асинхронно нужно через for...of
        for (const cur of currencyList) {
            await this.currencyService.create(cur)
        }
    }
}
