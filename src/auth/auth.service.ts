import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "../user/user.service"
import { IUser } from "../user/dto/index.dto"
import { User } from "../user/user.entity"

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signup(user: IUser) {
        const isExists = await this.userService.isExists(user.email)
        if (isExists) {
            throw new HttpException("User with such email alrewady registered", HttpStatus.BAD_REQUEST)
        }

        await this.userService.create(user)
        const payload = { user: user.email }
        return { access_token: this.jwtService.sign(payload) }
    }

    async signin(user: IUser) {
        const neededUser = await this.userService.findOne(user)
        if (!neededUser) {
            throw new HttpException("Invalid email or password", HttpStatus.BAD_REQUEST)
        }

        const payload = { user: user.email }
        return { access_token: this.jwtService.sign(payload) }
    }


    async validateUser(email: string): Promise<User> {
        return await this.userService.findByEmail(email)
    }

}
