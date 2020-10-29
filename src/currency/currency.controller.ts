import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common"
import { CurrencyService } from "./currency.service"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"

@Controller()
export class CurrencyController {
    constructor(private currencyService: CurrencyService) { }

    @UseGuards(JwtAuthGuard)
    @Get("/currencies")
    async getCurrencyList(@Query() query: any) {
        console.log("hello")
        const { offset, limit } = query
        return await this.currencyService.getList(Number(limit), Number(offset))
    }

    @UseGuards(JwtAuthGuard)
    @Get("/currency/:id")
    async getCurrency(@Param() params) {
        return await this.currencyService.getOne(params.id)
    }

}
