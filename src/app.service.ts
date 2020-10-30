import { Injectable } from "@nestjs/common"
import { ParserService } from "./parser/parser.service"
import { CurrencyService } from "./currency/currency.service"

@Injectable()
export class AppService {
	constructor(
		private parserService: ParserService,
		private currencyService: CurrencyService
	) { }
	async getHello() {
		await this.currencyService.removeAll()
		const xmlStr = await this.parserService.getXML("http://www.cbr.ru/scripts/XML_daily.asp")
		const list = await this.parserService.parseXML(xmlStr)
		await this.parserService.saveXMLToDB(list)
	}
}
