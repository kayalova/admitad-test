import { Injectable, HttpService } from "@nestjs/common"
import { parseString } from "xml2js"
import { CurrencyService } from "../currency/currency.service"
import { ICurrency } from "../currency/dto/index.dto"

@Injectable()
export class ParserService {
    constructor(
        private httpService: HttpService,
        private currencyService: CurrencyService
    ) { }

    async getXML(url: string): Promise<string> {
        return (await this.httpService.get(url).toPromise()).data
    }

    parseXML(xmlString: string): Promise<Array<ICurrency>> {
        return new Promise((resolve, reject) => {

            parseString(xmlString, function (err, res) {
                if (err) reject(err)

                const arr = res.ValCurs.Valute
                const list = arr.reduce((list, obj) => {

                    const currency: ICurrency = {
                        id: obj["$"]["ID"],
                        numcode: obj.NumCode[0],
                        charCode: obj.CharCode[0],
                        nominal: obj.Nominal[0],
                        name: obj.Name[0],
                        value: obj.Value[0]
                    }

                    list.push(currency)
                    return list
                }, [])

                resolve(list)
            })
        })
    }

    async saveXMLToDB(currencyList: Array<ICurrency>): Promise<void> {
        currencyList.forEach(async cur => await this.currencyService.create(cur))

        // // checking
        // const a = await this.currencyService.getList()
        // console.log("records: ", a)
    }

}
