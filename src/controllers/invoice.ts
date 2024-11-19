import { BaseContext } from 'koa'
import { request, summary, path, body, responses, tagsAll } from 'koa-swagger-decorator'
import { createInvoiceSchema, updateInvoiceSchema, requestInvoiceValidationSchema } from '../entities/invoice/invoice.schema'
import * as InvoiceService from '../services/invoice'
import * as ValidationService from '../services/validate'
import { response } from '../libraries/helpers'
import { Invoice } from '../entities/invoice/invoice'

@tagsAll(['User'])
export default class InvoiceController {
    @request('get', '/invoices')
    @summary('Find all invoices')
    @responses({
        200: { description: 'Success' },
        400: { description: 'Error' },
        401: { description: 'Token authorization error' },
        404: { description: 'invoices not found' },
    })
    public static async getInvoices(context: BaseContext): Promise<void> {
        response(context, 200, await InvoiceService.findAllInvoices(context, {}))
    }

    @request('get', '/invoice/{id}')
    @summary('Find invoice by id')
    @path({ id: { type: 'string', required: true, description: 'id of invoice to fetch' } })
    @responses({
        200: { description: 'success' },
        400: { description: 'validation error, invoice not found' },
        401: { description: 'token authorization error' },
    })
    public static async getInvoice(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestInvoiceValidationSchema, [
            '_id',
        ])

        response(context, 200, await InvoiceService.findInvoice(context, { _id: context.params.id }))
    }

    @request('post', '/invoices')
    @summary('Create a invoice')
    @body(createInvoiceSchema)
    @responses({
        201: { description: 'invoice created successfully' },
        400: { description: 'missing parameters, invalid password, validation errors' },
        409: { description: 'invoice already exists' },
    })
    public static async createInvoice(context: BaseContext): Promise<void> {
        const invoiceToBeCreated = InvoiceService.createNewInvoiceModel(context)

        console.log(invoiceToBeCreated);
        await ValidationService.validateRequest(context, invoiceToBeCreated, requestInvoiceValidationSchema, [
            'invoiceName',
        ])
        await InvoiceService.checkIfInvoiceAlreadyExists(context, { invoiceName: invoiceToBeCreated.invoiceName })
        await InvoiceService.saveNewInvoice(context, invoiceToBeCreated)

        response(context, 201, 'invoice created')
    }

    @request('put', '/invoices/{id}')
    @summary('Update a invoice')
    @path({ id: { type: 'string', required: true, description: 'id of user to update' } })
    @body(updateInvoiceSchema)
    @responses({
        200: { description: 'invoice updated successfully' },
        400: { description: 'invoice not found, invoice already exists, validation errors, invoice already exists' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async updateInvoice(context: BaseContext): Promise<void> {
        const invoiceToBeCreated = InvoiceService.createUpdateInvoiceModel(context)

        await ValidationService.validateRequest(context, invoiceToBeCreated, requestInvoiceValidationSchema, ['_id'])
        await InvoiceService.findInvoice(context, { _id: context.params.id })

        response(context, 200, (await InvoiceService.updateInvoice(context, invoiceToBeCreated)))
    }

    @request('delete', '/invoices/{id}')
    @summary('Delete invoice by id')
    @path({ id: { type: 'string', required: true, description: 'id of invoice' } })
    @responses({
        204: { description: 'invoice deleted successfully' },
        400: { description: 'invoice not found, validation errors' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async deleteInvoice(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestInvoiceValidationSchema, [
            '_id',
        ])

        const invoiceToRemove = await InvoiceService.findInvoice(context, { _id: context.params.id })

        await InvoiceService.removeInvoice(context, <Invoice>invoiceToRemove)

        response(context, 204)
    }
}
