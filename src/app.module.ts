import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { User } from "./user/user.entity"
import { Currency } from "./currency/currency.entity"
import { CurrencyModule } from "./currency/currency.module"
import { ParserModule } from "./parser/parser.module"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"

import { ParserService } from "./parser/parser.service"

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mongodb",
            url: "mongodb://localhost:27017",
            database: "my_db1",
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
export class AppModule {
    constructor(private parserService: ParserService) {
        this.parserService.addJobToQueue()
    }
}
