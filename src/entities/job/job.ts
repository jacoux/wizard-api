import _ from 'lodash'
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Address } from '../organization/organization'

export class Description {
    title!: string
    content!: string
}

export class InputField {
    label!: string
    field!: string
}

export class ApplicantProcess {
    order!: string
    field!: string
    action?: string
}

@Entity('Job')
export class Job {
    @ObjectIdColumn()
    _id!: string // Note: primary key MUST BE '_id' with the underscore

    @Column({ length: 80 })
    title!: string

    @Column()
    department!: string

    @Column()
    employmentRatio!: string

    @Column()
    maxAmountOfApplicants!: number

    @Column()
    contractTerm?: string

    @Column()
    salaryPackage!: string

    @Column()
    experience?: string

    @Column()
    responsible?: string

    @Column()
    address!: Address

    @Column()
    description?: Description

    @Column()
    applicantForm!: InputField

    @Column()
    applicantProcess!: ApplicantProcess

    @Column()
    organizationId!: string

    @Column()
    status?: number[]

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date
}
