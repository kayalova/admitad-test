import { Module, HttpModule } from "@nestjs/common"
import { ParserService } from "./parser.service"
import { CurrencyModule } from "../currency/currency.module"

@Module({
    imports: [HttpModule, CurrencyModule],
    providers: [ParserService],
    exports: [ParserService]
})
export class ParserModule { }
