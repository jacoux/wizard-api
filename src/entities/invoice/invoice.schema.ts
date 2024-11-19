import { Client } from '../client/client'

export const createInvoiceSchema = {
    invoiceNumber: { type: 'number', example: '222', required: true },
    invoiceNumberPrefix: { type: 'string', example: 'inv', required: true },
    creationDate: { type: 'string', example: '19/01/2021', required: true },
    payDate: { type: 'string', example: '20/01/2021', required: true },
    organizationId: { type: 'string', example: '1234567', required: true },
    client: { type: Client, example: '12345', required: true },
    extendedDate: { type: 'string', example: '20/02/2021', required: false },
    // payment
    payWithin: { type: 'number', example: '30', required: false },
    products: { type: 'string', example: 'Lassen en boren', required: true },
    currency: { type: 'string', example: 'euro', required: false },
    paymentDetails: { type: 'string', example: 'Te betalen voor 22/03/202', required: false },
    totalWithVat: { type: 'number', example: '22,22', required: true },
    totalWithoutVat: { type: 'number', example: '22,22', required: true },
    vatPercentage: { type: 'number', example: '21', required: true },
    chargeVat: { type: 'boolean', example: 'true', required: true },
    vatAmount: { type: 'number', example: '123', required: true },

    // notes
    footNotes: { type: 'string', example: 'Te betalen voor 22/02/22', required: false },
    invoiceName: { type: 'string', example: 'inv-222', required: false },
    description: { type: 'string', example: 'dit is je factuur', required: false },
}

export const updateInvoiceSchema = {
    invoiceNumber: { type: 'number', example: '222', required: true },
    invoiceNumberPrefix: { type: 'string', example: 'inv', required: true },
    creationDate: { type: 'string', example: '19/01/2021', required: true },
    payDate: { type: 'string', example: '20/01/2021', required: true },
    organizationId: { type: 'string', example: '1234567', required: true },
    client: { type: Client, example: '12345', required: true },
    extendedDate: { type: 'string', example: '20/02/2021', required: false },
    // payment
    payWithin: { type: 'number', example: '30', required: false },
    products: { type: 'string', example: 'Lassen en boren', required: true },
    currency: { type: 'string', example: 'euro', required: false },
    paymentDetails: { type: 'string', example: 'Te betalen voor 22/03/202', required: false },
    totalWithVat: { type: 'number', example: '22,22', required: true },
    totalWithoutVat: { type: 'number', example: '22,22', required: true },
    vatPercentage: { type: 'number', example: '21', required: true },
    chargeVat: { type: 'boolean', example: 'true', required: true },
        vatAmount: { type: 'number', example: '123', required: true },

    // notes
    footNotes: { type: 'string', example: 'Te betalen voor 22/02/22', required: false },
    invoiceName: { type: 'string', example: 'inv-222', required: false },
    description: { type: 'string', example: 'dit is je factuur', required: false },

}

export const requestInvoiceValidationSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        id: { type: 'string' },
        client: { type: 'string', minLength: 2, maxLength: 80 },
    }
}
