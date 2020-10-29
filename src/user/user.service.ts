import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.entity"
import * as utils from "../utils"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(user: User): Promise<any> {
        const newUser = new User()
        newUser.email = user.email
        newUser.password = utils.hashStr(user.password)
        newUser.password = user.password
        return await this.userRepository.save(newUser)
    }

    async findOne(user: User) {
        const hashedPassword = utils.hashStr(user.password)
        return await this.userRepository.findOne({ email: user.email, password: hashedPassword })
    }

    async isExists(email: string) {
        return await this.userRepository.findOne({ email })
    }

}
