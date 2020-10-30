import { Module, HttpModule } from "@nestjs/common"
import { ParserService } from "./parser.service"
import { CurrencyModule } from "../currency/currency.module"

import { BullModule } from "@nestjs/bull"
import { ParserConsumer } from "./parser.processor"

@Module({
    imports: [
        BullModule.registerQueue({
            name: "queue-1",
            redis: {
                host: "localhost",
                port: 6379
            }
        }),
        HttpModule,
        CurrencyModule
    ],
    providers: [ParserService, ParserConsumer],
    exports: [ParserService]
})
export class ParserModule {}
