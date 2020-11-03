import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
// Services 
import { UserService } from '../user/user.service'
// Dto 
import { UserDto } from '../user/dto/index.dto'
// Entities 
import { User } from '../user/user.entity'
// Constants 
import { serverResponse } from '../constants/responses'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    /**
     * @param  {UserDto} user
     */
    async signup(user: UserDto) {
        const isExists = await this.userService.findByEmail(user.email)
        if (isExists) {
            throw new HttpException(
                serverResponse.ALREADY_REGISTERED_USER,
                HttpStatus.BAD_REQUEST
            )
        }

        await this.userService.create(user)
        const payload = { user: user.email }
        return { access_token: this.jwtService.sign(payload) }
    }

    /**
     * @param  {UserDto} user
     */
    async signin(user: UserDto) {
        const neededUser = await this.userService.findOne(user)
        if (!neededUser) {
            throw new HttpException(
                serverResponse.INVALID_INPUT_DATA,
                HttpStatus.BAD_REQUEST
            )
        }

        const payload = { user: user.email }
        return { access_token: this.jwtService.sign(payload) }
    }

    /**
     * @param  {string} email
     * @returns Promise
     */
    async validateUser(email: string): Promise<User> {
        return await this.userService.findByEmail(email)
    }
}
