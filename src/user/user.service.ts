import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.entity"
import { IUser } from "./dto/index.dto"
import * as utils from "../utils"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(user: IUser): Promise<any> {
        const newUser = new User()
        newUser.email = user.email
        newUser.password = utils.hashStr(user.password)
        newUser.password = user.password
        return await this.userRepository.save(newUser)
    }

    async findOne(user: IUser): Promise<User> {
        const hashedPassword = utils.hashStr(user.password)
        return await this.userRepository.findOne({ email: user.email, password: hashedPassword })
    }

    async isExists(email: string): Promise<User> {
        return await this.userRepository.findOne({ email })
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ email })
    }
}
