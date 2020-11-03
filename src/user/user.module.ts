import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
// Services
import { UserService } from "./user.service"
// Entities
import { User } from "./user.entity"

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
    providers: [UserService]
})
export class UserModule { }
