import { Module, HttpModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { User } from "./user/user.entity"
import { Currency } from "./currency/currency.entity"
import { CurrencyModule } from "./currency/currency.module"
import { ParserModule } from "./parser/parser.module"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"


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
    HttpModule,
    CurrencyModule,
    ParserModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
