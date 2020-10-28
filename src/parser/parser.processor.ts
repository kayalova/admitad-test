import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('parser')
export class ParserProcessor {
    private readonly logger = new Logger(ParserProcessor.name);

    @Process('transcode')
    handleTranscode(job: Job) {
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        this.logger.debug('Transcoding completed');
    }
}