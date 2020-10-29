import { Controller, Get, Param, Query } from "@nestjs/common"
import { CurrencyService } from "./currency.service"

@Controller()
export class CurrencyController {
    constructor(private currencyService: CurrencyService) { }

    @Get("/currencies")
    async getCurrencyList(@Query() query: any) {
        const { offset, limit } = query
        return await this.currencyService.getList(Number(limit), Number(offset))
    }

    @Get("/currency/:id")
    async getCurrency(@Param() params) {
        return await this.currencyService.getOne(params.id)
    }

}
