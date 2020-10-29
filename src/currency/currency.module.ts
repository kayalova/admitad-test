import { Module, HttpModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CurrencyController } from "./currency.controller"
import { CurrencyService } from "./currency.service"
import { Currency } from "./currency.entity"

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Currency])
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService]
})
export class CurrencyModule { }
