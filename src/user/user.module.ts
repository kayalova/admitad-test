import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserService } from "./user.service"
import { User } from "./user.entity"

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    exports: [UserService],
    providers: [UserService]
})
export class UserModule { }
