import { Injectable } from "@nestjs/common"
import { ParserService } from "./parser/parser.service"

@Injectable()
export class AppService {
	constructor(private parserService: ParserService) { }
	async getHello() {
		const xmlStr = await this.parserService.getXML("http://www.cbr.ru/scripts/XML_daily.asp")
		const list = await this.parserService.parseXML(xmlStr)
		await this.parserService.saveXMLToDB(list)
	}
}
