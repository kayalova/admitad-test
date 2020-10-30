import { Injectable, HttpService } from "@nestjs/common"
import { parseString } from "xml2js"
import { CurrencyService } from "../currency/currency.service"
import { CurrencyDto } from "../currency/dto/index.dto"
import { parsedXML } from "./parsedXML"

import { Queue } from "bull"
import { InjectQueue } from "@nestjs/bull"

@Injectable()
export class ParserService {
    constructor(
        @InjectQueue("queue-1") private parserQueue: Queue,
        private httpService: HttpService,
        private currencyService: CurrencyService
    ) {}

    async addJobToQueue() {
        await this.parserQueue.add("getXMLURL", {
            xmlURL: "http://www.cbr.ru/scripts/XML_daily.asp"
        })
    }

    async getXML(url: string): Promise<any> {
        const a = (
            await this.httpService
                .get(url, { responseType: "arraybuffer" })
                .toPromise()
        ).data
        return a.toString("utf-8")
    }

    parseXML(xmlString: string): Promise<Array<CurrencyDto>> {
        const Iconv = require("iconv").Iconv
        const conv = Iconv("windows-1251", "utf8")
        const r = conv.convert(xmlString).toString()
        // console.log("result ", r) // whyy
        return new Promise((resolve, reject) => {
            parseString(r, function(err: any, res: any) {
                if (err) reject(err)
                const arr = res.ValCurs.Valute
                const list = arr.reduce(
                    (list: Array<CurrencyDto>, xmlObject: parsedXML) => {
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
                    },
                    []
                )

                resolve(list)
            })
        })
    }

    async updateDBwithXML(currencyList: Array<CurrencyDto>): Promise<void> {
        this.currencyService.removeAll()
        currencyList.forEach(
            async cur => await this.currencyService.create(cur)
        )
    }
}
