import { Post, Controller, Body } from '@nestjs/common'
import {
    ApiOperation,
    ApiTags,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiOkResponse
} from '@nestjs/swagger'
// Services 
import { AuthService } from './auth.service'
// Dto 
import { UserDto } from '../user/dto/index.dto'
import { AccessTokenDto } from './dto/index.dto'
// Constants 
import { serverResponseInterface } from './authResponse.interface'

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Login user' })
    @ApiOkResponse({ type: AccessTokenDto })
    @ApiBadRequestResponse({ description: serverResponseInterface.INVALID_INPUT_DATA })
    @Post('signin')
    async signin(@Body() user: UserDto): Promise<AccessTokenDto> {
        const token = await this.authService.signin(user)
        return { accessToken: token }
    }

    @ApiOperation({ summary: 'Register user' })
    @ApiCreatedResponse({
        type: AccessTokenDto,
        description: serverResponseInterface.SUCCESSFULLY_CREATED_USER
    })
    @ApiBadRequestResponse({
        description: serverResponseInterface.ALREADY_REGISTERED_USER
    })
    @Post('signup')
    async signup(@Body() user: UserDto): Promise<AccessTokenDto> {
        const token = await this.authService.signup(user)
        return { accessToken: token }
    }
}
