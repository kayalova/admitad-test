import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
// Modules
import { CurrencyModule } from './currency/currency.module'
import { ParserModule } from './parser/parser.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        MongooseModule.forRoot(`${process.env.MONGO_URI}`),
        AuthModule,
        CurrencyModule,
        ParserModule,
        UserModule
    ]
})

export class AppModule { }
