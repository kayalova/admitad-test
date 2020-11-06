import { HttpModule, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
// Controllers 
import { CurrencyController } from "./currency.controller";
// Entities 
import { CurrencySchema } from "./currency.schema";
// Services 
import { CurrencyService } from "./currency.service";

@Module({
    imports: [HttpModule, MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }])],
    controllers: [CurrencyController],
    providers: [CurrencyService],
    exports: [CurrencyService]
})
export class CurrencyModule { }
