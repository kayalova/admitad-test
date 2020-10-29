import { Controller, Get, Param, Body } from "@nestjs/common"
import { CurrencyService } from "./currency.service"

@Controller()
export class CurrencyController {
    constructor(private currencyService: CurrencyService) { }

    @Get("/currencies")
    async getCurrencyList(@Body() body: any) {
    }

    @Get("/currency/:id")
    getCurrency(@Param() params) {
    }

}
