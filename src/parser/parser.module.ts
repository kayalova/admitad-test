import { Module, HttpModule } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
// Services
import { ParserService } from './parser.service'
// Modules
import { CurrencyModule } from '../currency/currency.module'
// Consumers
import { ParserConsumer } from './parser.processor'

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'queue-1',
            redis: {
                host: 'localhost',
                port: 6379
            }
        }),
        HttpModule,
        CurrencyModule
    ],
    providers: [ParserService, ParserConsumer],
    exports: [ParserService]
})
export class ParserModule { }
