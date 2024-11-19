import _ from 'lodash'
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Client } from '../client/client'
// import { bcryptCompareAsync, bcryptHashAsync } from '../libraries/crypto'
// import { UserPublic } from '../interfaces/user.interfaces'

@Entity('Project')
export class Project {
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
    projectNumber!: number

    @CreateDateColumn()
    startDate!: Date

    @CreateDateColumn()
    endDate!: Date

    @ManyToOne(() => Client, (client: Client) => client.projects)
    client!: Client

    @Column()
    organizationId!: string

    @Column()
    amountOfProjectMembers?: number

    @Column()
    priority?: string

    @Column()
    projectResponsiblePerson?: string

    @Column()
    status?: string

    @Column()
    maxBudget?: number

    @Column()
    currentBudget?: number
    
    @Column()
    currency?: string

    @Column()
    description?: string

    @Column()
    linkedProjects?: []

    @Column()
    invoices?: []

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date
}
