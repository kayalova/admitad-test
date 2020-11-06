import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
// Constants 
import { serverResponseInterface } from './authResponse.interface'
// Dto 
import { UserDto } from '../user/dto/index.dto'
import { accessToken } from './dto/index.dto'
// Entities 
import { User } from '../user/user.schema'
// Services 
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    /**
     * @param  {UserDto} user
     * @returns Promise
     */
    async signup(user: UserDto): Promise<accessToken> {
        const isExists = await this.userService.findByEmail(user.email)
        if (isExists) {
            throw new HttpException(
                serverResponseInterface.ALREADY_REGISTERED_USER,
                HttpStatus.BAD_REQUEST
            )
        }

        await this.userService.create(user)
        const payload = { user: user.email }
        return this.jwtService.sign(payload)
    }


    /**
     * @param  {UserDto} user
     * @returns Promise
     */
    async signin(user: UserDto): Promise<accessToken> {
        const neededUser = await this.userService.findOne(user)
        if (!neededUser) {
            throw new HttpException(
                serverResponseInterface.INVALID_INPUT_DATA,
                HttpStatus.BAD_REQUEST
            )
        }

        const payload = { user: user.email }
        return this.jwtService.sign(payload)
    }

    /**
     * @param  {string} email
     * @returns Promise
     */
    async validateUser(email: string): Promise<User> {
        return await this.userService.findByEmail(email)
    }
}
