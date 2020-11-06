import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
//Dto
import { CurrencyDto } from "./dto/index.dto"

export type CurrencyDocument = Currency & Document

@Schema()
export class Currency implements CurrencyDto {

    @ApiProperty()
    @Prop()
    id: string

    @ApiProperty()
    @Prop()
    numcode: number

    @ApiProperty()
    @Prop()
    charCode: string

    @ApiProperty()
    @Prop()
    nominal: number

    @ApiProperty()
    @Prop()
    name: string

    @ApiProperty()
    @Prop()
    value: string
}

export const CurrencySchema = SchemaFactory.createForClass(Currency)