import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
// Controllers 
import { AuthController } from './auth.controller'
// Modules 
import { UserModule } from '../user/user.module'
// Services 
import { AuthService } from './auth.service'
// Strategies
import { JwtStrategy } from './strategies/jwt.strategy'
// Constants
import { jwtConstants } from '../constants/jwt'

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '12h' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
