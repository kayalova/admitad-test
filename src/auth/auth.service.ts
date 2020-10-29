import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UserService } from "../user/user.service"
import { User } from "../user/user.entity"

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }

    signup(user: User) {
        // check if user doesnt exists
        const payload = { username: user.email, sub: user.id }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    signin(user: User) {
        // check if user valid
        const payload = { username: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        // const user = await this.usersService.findOne(new User(email, password))
        // if (user && user.password === pass) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        // return null;
    }
}
