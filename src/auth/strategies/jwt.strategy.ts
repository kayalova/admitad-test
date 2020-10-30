import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConstants } from "../../constants/jwt"
import { AuthService } from "../auth.service"
import { User } from "../../user/user.entity"
import { serverResponse } from '../../constants/responses'

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
        const user = await this.authService.validateUser(payload.user)
        if (!user) {
            throw new HttpException(serverResponse.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
        }
        return user
    }
}