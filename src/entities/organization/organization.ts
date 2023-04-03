import _ from 'lodash'
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
// import { bcryptCompareAsync, bcryptHashAsync } from '../libraries/crypto'
// import { UserPublic } from '../interfaces/user.interfaces'

export class Address {
    @Column()
    streetName!: string
    @Column()
    streetNumber!: string
    @Column()
    streetBus!: string
    @Column()
    postalCode!: string
    @Column()
    city!: string
    @Column()
    country!: string
}

export class Employee {
    @Column()
    email!: string
    @Column()
    role!: string
}

@Entity('Organization')
export class Organization {
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
    address!: Address

    @Column()
    employee!: Employee

    @Column()
    sector!: string

    @Column()
    description!: string

    @Column()
    companyEmail!: string

    @Column()
    accountType!: string

    @Column()
    startInvoiceNumber?: number

    @Column()
    companyVat!: string

    @Column()
    tel?: string

    @Column()
    bankNumber?: string

    @Column()
    bankSwift?: string

    @Column()
    responsible?: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date
}
