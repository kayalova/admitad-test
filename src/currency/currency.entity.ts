import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm"
import { ICurrency } from "./dto/index.dto"

@Entity()
export class Currency implements ICurrency {

    @ObjectIdColumn()
    objectID: ObjectID

    @Column()
    id: number

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