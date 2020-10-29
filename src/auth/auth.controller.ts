import { Post, Controller, Body } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { IUser } from "../user/dto/index.dto"

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("signin")
    async signin(@Body() user: IUser) {
        return await this.authService.signin(user)
    }

    @Post("signup")
    async signup(@Body() user: IUser) {
        return await this.authService.signup(user)
    }

}

