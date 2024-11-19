export interface client {
    id: string
    email: string
    vat: string
    name: string
    responsible: string
    organizationId: string
    firstName?: string
    lastName?: string
    tel?: string
    address?: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
}