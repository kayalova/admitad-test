import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'


@Injectable()
export class ParserService {
    constructor(@InjectQueue('parser') private audioQueue: Queue) {

    }
}