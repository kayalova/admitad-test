import { AuthService } from "./auth.service"
import { Post, Controller } from "@nestjs/common"

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("signin")
    signin() {
        // return this.authService.signin()
    }

    @Post("signup")
    signup() {
        // return this.authService.signup()
    }

}

