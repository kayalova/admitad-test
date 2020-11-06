import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
// Entities
import { UserSchema } from "./user.schema";
// Services
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    exports: [UserService],
    providers: [UserService]
})
export class UserModule { }
