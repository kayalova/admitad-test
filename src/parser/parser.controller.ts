import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('parser')
export class ParserController {
    constructor(@InjectQueue('parser') private readonly parserQueue: Queue) { }

    @Post('transcode')
    async transcode() {
        await this.parserQueue.add('transcode', {
            url: 'http://www.cbr.ru/scripts/XML_daily.asp'
        });
    }
}