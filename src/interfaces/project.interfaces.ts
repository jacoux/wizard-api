import { client } from './client.interface'

export interface Project {
    id: string
    name: string
    projectNumber: number
    startDate: Date
    endDate: Date
    organizationId: string
    client: client
    amountOfProjectMembers?: number
    priority?: Priority
    projectResponsiblePerson?: string
    status?: string
    linkedProjects?: []
    maxBudget?: number
    currentBudget?: number
    currency?: Currency
    invoices?: []
    description?: string
}

export enum Priority {
    LOW,
    MEDIUM,
    HIGH
}

enum Currency {
    EURO,
    POND,
    DOLLAR
}