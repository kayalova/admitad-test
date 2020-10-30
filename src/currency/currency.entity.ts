import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm"
import { CurrencyDto } from "./dto/index.dto"

@Entity()
export class Currency implements CurrencyDto {
    @ObjectIdColumn()
    objectID: ObjectID

    @Column()
    id: string

    @Column()
    numcode: number

    @Column()
    charCode: string

    @Column()
    nominal: number

    @Column()
    name: string

    @Column()
    value: string
}
