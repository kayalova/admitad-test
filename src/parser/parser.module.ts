import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ParserController } from './parser.controller';
import { ParserProcessor } from './parser.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'parser',
        }),
    ],
    controllers: [ParserController],
    providers: [ParserProcessor],
})
export class ParserModule { }