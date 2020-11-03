import { Module, HttpModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
// Controllers 
import { CurrencyController } from "./currency.controller"
// Services 
import { CurrencyService } from "./currency.service"
// Entities 
import { Currency } from "./currency.entity"

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Currency])],
    controllers: [CurrencyController],
    providers: [CurrencyService],
    exports: [CurrencyService]
})
export class CurrencyModule { }
