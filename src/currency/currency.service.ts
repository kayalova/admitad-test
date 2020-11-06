import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
// Entity
import { Currency, CurrencyDocument } from './currency.schema'
// DTO
import { CurrencyDto } from './dto/index.dto'

@Injectable()
export class CurrencyService {
    constructor(
        @InjectModel('Currency')
        private readonly currencyModel: Model<CurrencyDocument>
    ) { }

    /**
     * @param  {} count=10
     * @param  {} offset=0
     * @returns Promise
     */
    async getList(count = 10, offset = 0): Promise<Array<Currency>> {
        return await this.currencyModel.find().limit(count).skip(offset)
    }

    /**
     * @param  {string} id
     * @returns Promise
     */
    async getOne(id: string): Promise<Currency> {
        return await this.currencyModel.findById(id)
    }

    async create(currency: CurrencyDto): Promise<CurrencyDocument> {
        return await new this.currencyModel(currency).save()
    }

    /**
     * @returns Promise
     */
    async removeAll(): Promise<any> {
        await this.currencyModel.deleteMany({})
    }
}

/*

*/