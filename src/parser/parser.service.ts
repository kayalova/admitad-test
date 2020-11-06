import { InjectQueue } from '@nestjs/bull'
import { HttpService, Injectable, OnModuleInit } from '@nestjs/common'
import { Queue } from 'bull'
import { decode } from 'iconv-lite'
import { parseString } from 'xml2js'
// Services
import { CurrencyService } from '../currency/currency.service'
// DTO
import { CurrencyDto } from '../currency/dto/index.dto'
// Interfaces
import { parsedXMLInterface } from './parsedXML.interface'


@Injectable()
export class ParserService implements OnModuleInit {
    constructor(
        @InjectQueue('queue-1') private parserQueue: Queue,
        private httpService: HttpService,
        private currencyService: CurrencyService
    ) { }

    async onModuleInit() {
        await this.parserQueue.empty()
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

    /**
     * @param  {string} url
     * @returns Promise
     */
    async getXMLBuffer(url: string): Promise<any> {
        return (
            await this.httpService
                .get(url, { responseType: 'arraybuffer' })
                .toPromise()
        ).data
    }

    /**
     * @param  {Buffer} xmlBuffer
     * @returns Promise
     */
    parseXML(xmlBuffer: Buffer): Promise<Array<CurrencyDto>> {
        const xmlString = decode(xmlBuffer, 'win-1251')

        return new Promise((resolve, reject) => {
            parseString(xmlString, function (err: any, res: any) {
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

    /**
     * @param  {Array<CurrencyDto>} currencyList
     * @returns Promise
     */
    async updateDBwithXML(currencyList: Array<CurrencyDto>): Promise<void> {
        await this.currencyService.removeAll()
        for (const cur of currencyList) {
            await this.currencyService.create(cur)
        }
    }
}
