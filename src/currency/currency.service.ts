import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getMongoRepository } from 'typeorm'
//low: Best practice - разделять импорты по группам
// Entity
import { Currency } from './currency.entity'
// DTO
import { CurrencyDto } from './dto/index.dto'

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(Currency)
        private readonly currencyRepository: Repository<Currency>
    ) { }

    //low: Best practice - jsDoc для метода
    async getList(count = 10, offset = 0): Promise<Array<Currency>> {
        return await this.currencyRepository.find({
            take: count,
            skip: offset * count
        })
    }

    //low: Best practice - jsDoc для метода
    async getOne(id: string) {
        return await this.currencyRepository.findOne({ id })
    }

   //low: Best practice - jsDoc для метода
    async create(currency: CurrencyDto): Promise<Currency> {
        const c = new Currency()
        c.id = currency.id
        c.name = currency.name
        c.nominal = currency.nominal
        c.numcode = currency.numcode
        c.value = currency.value
        return await this.currencyRepository.save(c)
    }

    //low: Best practice - jsDoc для метода
    async removeAll(): Promise<any> {
        const cRepository = getMongoRepository(Currency)
        await cRepository.deleteMany({})
    }
}
