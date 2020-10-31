import { Process, Processor } from "@nestjs/bull"
import { Logger } from "@nestjs/common"
import { Job } from "bull"

import { ParserService } from "./parser.service"

@Processor("queue-1")
export class ParserConsumer {
    private readonly logger = new Logger(ParserConsumer.name)
    constructor(private parserService: ParserService) { }

    @Process("getXMLURL")
    async getXMLURL(job: Job, done: any) {
        this.logger.debug("Started parsing xml...")
        const xmlString = await this.parserService.getXMLBuffer(job.data.xmlURL)
        const records = await this.parserService.parseXML(xmlString)
        await this.parserService.updateDBwithXML(records)
        this.logger.debug("Parsing completed")
        done()
    }
}
