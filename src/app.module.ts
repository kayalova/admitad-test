import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// Entities
import { User } from './user/user.entity'
import { Currency } from './currency/currency.entity'
// Modules
import { CurrencyModule } from './currency/currency.module'
import { ParserModule } from './parser/parser.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        //low: TypeOrmModule - хорошее решение, но лично по опыту советую Mongoose - он лучше заточен под mongodb
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.MONGO_URI,
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

export class AppModule { }
