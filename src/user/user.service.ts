import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
// Entities
import { User } from "./user.entity"
// Dto
import { UserDto } from "./dto/index.dto"
// utils
import * as utils from "../utils"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(user: UserDto): Promise<any> {
        const newUser = new User()
        newUser.email = user.email
        newUser.password = utils.hashStr(user.password)
        return await this.userRepository.save(newUser)
    }

    async findOne(user: UserDto): Promise<User> {
        const hashedPassword = utils.hashStr(user.password)
        return await this.userRepository.findOne({
            email: user.email,
            password: hashedPassword
        })
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ email })
    }
}
