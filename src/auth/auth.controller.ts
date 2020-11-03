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
// Constants 
import { serverResponse } from '../constants/responses'

// medium: Для  каждого route лучше описать schema возвращаемого объекта в swagger
@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Login user' })
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: serverResponse.INVALID_INPUT_DATA })
    @Post('signin')
    async signin(@Body() user: UserDto) {
        return await this.authService.signin(user)
    }

    @ApiOperation({ summary: 'Register user' })
    @ApiCreatedResponse({
        description: serverResponse.SUCCESSFULLY_CREATED_USER
    })
    @ApiBadRequestResponse({
        description: serverResponse.ALREADY_REGISTERED_USER
    })
    @Post('signup')
    async signup(@Body() user: UserDto) {
        return await this.authService.signup(user)
    }
}
