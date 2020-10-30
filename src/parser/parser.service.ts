import { Injectable, HttpService } from "@nestjs/common"
import { parseString } from "xml2js"
import { CurrencyService } from "../currency/currency.service"
import { CurrencyDto } from "../currency/dto/index.dto"
import { parsedXML } from './parsedXML'

@Injectable()
export class ParserService {
    constructor(
        private httpService: HttpService,
        private currencyService: CurrencyService
    ) { }

    async getXML(url: string): Promise<string> {
        return (await this.httpService.get(url).toPromise()).data
    }

    parseXML(xmlString: string): Promise<Array<CurrencyDto>> {
        return new Promise((resolve, reject) => {

            parseString(xmlString, function (err: any, res: any) {

                if (err) reject(err)
                const arr = res.ValCurs.Valute
                const list = arr.reduce((list: Array<CurrencyDto>, xmlObject: parsedXML) => {
                    const currency: CurrencyDto = {
                        id: xmlObject["$"]["ID"],
                        numcode: xmlObject.NumCode[0],
                        charCode: xmlObject.CharCode[0],
                        nominal: xmlObject.Nominal[0],
                        name: xmlObject.Name[0],
                        value: xmlObject.Value[0]
                    }

                    list.push(currency)
                    return list
                }, [])

                resolve(list)
            })
        })
    }

    async saveXMLToDB(currencyList: Array<CurrencyDto>): Promise<void> {
        currencyList.forEach(async cur => await this.currencyService.create(cur))
    }

}
