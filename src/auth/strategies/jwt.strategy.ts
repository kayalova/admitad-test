import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConstants } from "../constants"
import { AuthService } from "../auth.service"
import { User } from "../../user/user.entity"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any): Promise<User> {
        console.log("payload: ", payload)
        const user = await this.authService.validateUser(payload.user)
        console.log(user)
        if (!user) {
            throw new HttpException("Invalid token or not provided", HttpStatus.UNAUTHORIZED)
        }
        return user
    }
}