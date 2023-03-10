import _ from 'lodash'
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
// import { bcryptCompareAsync, bcryptHashAsync } from '../libraries/crypto'
// import { UserPublic } from '../interfaces/user.interfaces'

@Entity('Client')
export class Client {
    /*
        // Note: I use shortid to generate ids for the primary columns
        // in other databases like postgres, you can use
        // @PrimaryColumn() with shortid 
        // or @PrimaryGeneratedColumn('uuid') to let the db generate the ids etc

        // example, to use shortid with postgres:
        @PrimaryColumn()
        _id: string // Note: primary key can be anything e.g. id, userId etc
    */

    // mongo (which I'm using)
    @ObjectIdColumn()
    _id!: string // Note: primary key MUST BE '_id' with the underscore

    @Column({ length: 80 })
    name!: string

    @Column()
    address!: string

    @Column()
    email!: string

    @Column()
    organizationId!: string

    @Column()
    description!: string

    @Column()
    vat!: string

    @Column()
    tel?: string

    @Column()
    responsible?: string

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date
}
