import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm"

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    email: string

    @Column()
    password: string
}
