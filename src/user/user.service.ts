import { Injectable } from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
// utils
import * as utils from "../utils"
// Dto
import { UserDto } from "./dto/index.dto"
// Entities
import { User, UserDocument } from "./user.schema"

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>
    ) { }

    async create(user: UserDto): Promise<UserDocument> {
        const hashedPassword = utils.hashStr(user.password)
        return await new this.userModel({ email: user.email, password: hashedPassword }).save()
    }

    async findOne(user: UserDto): Promise<User> {
        const hashedPassword = utils.hashStr(user.password)
        return await this.userModel.findOne({
            email: user.email,
            password: hashedPassword
        })
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email })
    }
}
