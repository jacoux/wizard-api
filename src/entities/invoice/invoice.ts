import _ from 'lodash'
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Client } from '../client/client'
// import { bcryptCompareAsync, bcryptHashAsync } from '../libraries/crypto'
// import { UserPublic } from '../interfaces/user.interfaces'

@Entity('Invoice')
export class Invoice {
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

    @Column()
    invoiceNumber!: number

    @Column()
    invoiceNumberPrefix?: string

    @Column()
    invoiceName?: string

    @Column()
    creationDate!: Date

    @Column()
    payDate!: Date

    @Column()
    extendedDate?: Date

    // of clientId
    @ManyToOne(() => Client, (client: Client) => client.invoices)
    client!: Client

    @Column()
    organizationId!: string

    @Column()
    payWithin!: number

    @Column()
    vatAmount!: number

    @Column()
    footNotes?: string

    @Column()
    products?: string;

    @Column()
    currency?: string

    @Column()
    paymentDetails?: string

    @Column()
    totalWithVat?: number

    @Column()
    totalWithoutVat?: number

    @Column()
    vatPercentage?: string

    @Column()
    chargeVat?: boolean

    @Column()
    description?: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date
}
