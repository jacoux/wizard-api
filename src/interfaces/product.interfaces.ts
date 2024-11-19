import { Currency } from './project.interfaces'

 export interface Product {
    name: string
    organizationId: number
    vatPercentage: string
    price: number
    description: string 
    currency: Currency
    isHourlyRate?: boolean
 }