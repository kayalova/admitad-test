import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
//low: Best practice - разделять импорты по группам
// Entities
import { User } from './user/user.entity'
import { Currency } from './currency/currency.entity'
// Modules
import { CurrencyModule } from './currency/currency.module'
import { ParserModule } from './parser/parser.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

import { ParserService } from './parser/parser.service'

@Module({
    imports: [
        //low: TypeOrmModule - хорошее решение, но лично по опыту советую Mongoose - он лучше заточен под mongodb
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://root:root@localhost:27117/my_db1?authMechanism=DEFAULT&authSource=admin', //low: лучше использовать dotenv что бы в .env файлах хранить все необходимые константы для подключения
            entities: [User, Currency],
            synchronize: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        }),
        AuthModule,
        CurrencyModule,
        ParserModule,
        UserModule
    ]
})

//low: Можно в конструктор, а можно и даже лучше - для более продвинутого использования DI в nestjs использовать OnModuleInit
export class AppModule {
    constructor(private parserService: ParserService) {
        this.parserService.addJobToQueue()
    }
}
