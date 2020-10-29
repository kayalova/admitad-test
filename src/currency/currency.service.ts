import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Currency } from "./currency.entity"
import { ICurrency } from "./dto/index.dto"

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(Currency)
        private readonly currencyRepository: Repository<Currency>
    ) { }

    async getList(): Promise<any> {
        return await this.currencyRepository.find()
    }

    async getOne() {
    }

    async create(currency: ICurrency) {
        const c = new Currency()
        c.id = currency.id
        c.name = currency.name
        c.nominal = currency.nominal
        c.numcode = currency.numcode
        c.value = currency.value
        return await this.currencyRepository.save(c)
    }
}
