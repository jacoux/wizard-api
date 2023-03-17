import shortid from 'shortid'
import { BaseContext } from 'koa'
import { getManager, Repository } from 'typeorm'
import { Invoice } from '../entities/invoice/invoice'
import * as errors from '../libraries/errors'
import { logger } from '../libraries/logger'


/**
 * Fetches all users in the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Array<Invoice>>} a promise with array of fetched users
 */
export const findAllInvoices = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Array<Invoice>> {
    const invoiceRepository: Repository<Invoice> = getManager().getRepository(Invoice)
    let invoice = []

    try {
        invoice = await invoiceRepository.find(qryObj)
    } catch (error) {
        logger.error('findAllInvoices', { error })
        context.throw(new errors.InternalServerError())
    }

    return invoice.map((invoice: Invoice): Invoice => invoice)
}

/**
 * Fetches a single user from the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Invoice|Invoice>} a promise with the fetched user
 */
export const findInvoice = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Invoice> {
    const invoiceRepository: Repository<Invoice> = getManager().getRepository(Invoice);

    let invoice

    try {
        invoice = await invoiceRepository.findOne(qryObj)
    } catch (error) {
        logger.error('findUser', { error })
        context.throw(new errors.InternalServerError())
    }

    if (!invoice) context.throw(new errors.ObjectNotFound('invoice '))

    return invoice
}

/**
 * Checks if the user already exists in the collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<void>} a void promise if user doesn't exists. throws error if user already exists 
 */
export const checkIfInvoiceAlreadyExists = async function (context: BaseContext, qryObj: Record<string, any>): Promise<void> {
    const invoiceRepository: Repository<Invoice> = getManager().getRepository(Invoice)

    try {
        if (!await invoiceRepository.findOne(qryObj)) return
    } catch (error) {
        logger.error('checkIfUserAlreadyExists', { error })
        context.throw(new errors.InternalServerError())
    }

    context.throw(new errors.UserAlreadyExists())
}


/**
 * Returns a new User model for saving a new user
 * 
 * @param  {BaseContext} context Koa context object
 * @returns {Invoice} the created user model
 */
export const createNewInvoiceModel = function (context: BaseContext): Invoice {
    const invoice: Invoice = new Invoice()

    invoice._id = shortid.generate();
    invoice.invoiceNumber = context.request.body.invoiceNumber
    invoice.invoiceNumberPrefix = context.request.body.invoiceNumberPrefix
    invoice.invoiceName = context.request.body.invoiceName
    invoice.creationDate = context.request.body.creationDate
    invoice.payDate = context.request.body.payDate
    invoice.extendedDate = context.request.body.extendedDate
    invoice.client = context.request.body.client
    invoice.organizationId = context.request.body.organizationId
    invoice.payWithin = context.request.body.payWithin
    invoice.footNotes = context.request.body.footNotes
    invoice.products = context.request.body.products
    invoice.currency = context.request.body.currency
    invoice.paymentDetails = context.request.body.paymentDetails
    invoice.totalWithVat = context.request.body.totalWithVat
    invoice.totalWithoutVat = context.request.body.totalWithoutVat
    invoice.vatPercentage = context.request.body.vatPercentage
    invoice.chargeVat = context.request.body.chargeVat
    invoice.description = context.request.body.description

    return invoice
}

/**
 * Returns a new User model for saving an updated user
 * 
 * @param  {BaseContext} context Koa context object
 * @returns {Invoice} the created user model
 */
export const createUpdateInvoiceModel = function (context: BaseContext): Invoice {
    const invoice: Invoice = new Invoice()
    

    invoice._id = shortid.generate();
    invoice.invoiceNumber = context.request.body.invoiceNumber
    invoice.invoiceNumberPrefix = context.request.body.invoiceNumberPrefix
    invoice.invoiceName = context.request.body.invoiceName
    invoice.creationDate = context.request.body.creationDate
    invoice.payDate = context.request.body.payDate
    invoice.extendedDate = context.request.body.extendedDate
    invoice.client = context.request.body.client
    invoice.organizationId = context.request.body.organizationId
    invoice.payWithin = context.request.body.payWithin
    invoice.footNotes = context.request.body.footNotes
    invoice.products = context.request.body.products
    invoice.currency = context.request.body.currency
    invoice.paymentDetails = context.request.body.paymentDetails
    invoice.totalWithVat = context.request.body.totalWithVat
    invoice.totalWithoutVat = context.request.body.totalWithoutVat
    invoice.vatPercentage = context.request.body.vatPercentage
    invoice.chargeVat = context.request.body.chargeVat
    invoice.vatAmount = context.request.body.vatAmount
    invoice.description = context.request.body.description

    // remove fields that should not be updated
    delete invoice.createdAt

    return invoice
}

/**
 * Saves a new user in the User collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Invoice} invoice the user to be saved 
 * @returns {Promise<Invoice>} a promise with the saved user
 */

export const saveNewInvoice = async function (context: BaseContext, invoice: Invoice): Promise<Invoice> {
    const invoiceRepository: Repository<Invoice> = getManager().getRepository(Invoice)

    try {
        return invoiceRepository.save(invoice)
    } catch (error) {
        logger.error('saveNewUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * Saves an updated invoice in the invoice collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Invoice} invoice the user to be saved
 * @returns {Promise<Invoice>}  a promise with the saved updated user
 */
export const updateInvoice = async function (context: BaseContext, invoice: Invoice): Promise<Invoice> {
    const invoiceRepository: Repository<Invoice> = getManager().getRepository(Invoice)

    try {
        delete invoice.createdAt

        return invoiceRepository.save(invoice)
    } catch (error) {
        logger.error('updateUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * @param  {BaseContext} context Koa context object
 * @param  {Invoice} invoice the user to be removed
 * @returns {Promise<Invoice>} a promise with the removed user
 */
export const removeInvoice = async function (context: BaseContext, invoice: Invoice): Promise<Invoice> {
    const invoiceRepository: Repository<Invoice> = getManager().getRepository(Invoice)

    try {
        return invoiceRepository.remove(invoice)
    } catch (error) {
        logger.error('removeUser', { error })
        context.throw(new errors.InternalServerError())
    }
}