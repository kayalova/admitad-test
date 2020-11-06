import { ApiProperty } from '@nestjs/swagger'

export class AccessTokenDto {
    @ApiProperty()
    accessToken: accessToken
}

export type accessToken = string