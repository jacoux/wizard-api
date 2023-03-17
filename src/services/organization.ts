import shortid from 'shortid'
import { BaseContext } from 'koa'
import { getManager, Repository } from 'typeorm'
import { Organization } from '../entities/organization/organization'
import * as errors from '../libraries/errors'
import { logger } from '../libraries/logger'

/**
 * Fetches all users in the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Array<Organization>>} a promise with array of fetched users
 */
export const findAllOrganizations = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Array<Organization>> {
    const organizationRepository: Repository<Organization> = getManager().getRepository(Organization)
    let organization = []

    try {
        organization = await organizationRepository.find(qryObj)
    } catch (error) {
        logger.error('findAllOrganizations', { error })
        context.throw(new errors.InternalServerError())
    }

    return organization.map((organization: Organization): Organization => organization)
}

/**
 * Fetches a single user from the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<User|UserPublic>} a promise with the fetched user
 */
export const findOrganization = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Organization> {
    const organizationRepository: Repository<Organization> = getManager().getRepository(Organization)
    let organization

    try {
        organization = await organizationRepository.findOne(qryObj)
    } catch (error) {
        logger.error('findUser', { error })
        context.throw(new errors.InternalServerError())
    }

    if (!organization) context.throw(new errors.UserNotFound())

    return organization
}

/**
 * Checks if the user already exists in the collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<void>} a void promise if user doesn't exists. throws error if user already exists 
 */
export const checkIfOrganizationAlreadyExists = async function (context: BaseContext, qryObj: Record<string, any>): Promise<void> {
    const organizationRepository: Repository<Organization> = getManager().getRepository(Organization)

    try {
        if (!await organizationRepository.findOne(qryObj)) return
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
 * @returns {Organization} the created user model
 */
export const createNewOrganizationModel = function (context: BaseContext): Organization {
    const organization: Organization = new Organization()

    organization._id = shortid.generate()
    organization.name = context.request.body.name
    organization.vat = context.request.body.vat
    organization.address = context.request.body.address || ''
    organization.description = context.request.body.description || ''
    organization.bankNumber = context.request.body.bankNumber
    organization.bankSwift = context.request.body.bankSwift
    organization.startInvoiceNumber = context.request.body.startInvoiceNumber || '1'


    return organization
}

/**
 * Returns a new User model for saving an updated user
 * 
 * @param  {BaseContext} context Koa context object
 * @returns {Organization} the created user model
 */
export const createUpdateOrganizationModel = function (context: BaseContext): Organization {
    const organization: Organization = new Organization()

    organization._id = context.params.id
    organization.name = context.request.body.name
    organization.vat = context.request.body.vat
    organization.address = context.request.body.address
    organization.description = context.request.body.description
    organization.bankNumber = context.request.body.bankNumber
    organization.bankSwift = context.request.body.bankSwift
    organization.startInvoiceNumber = context.request.body.startInvoiceNumber

    // remove fields that should not be updated
    delete organization.createdAt

    return organization
}

/**
 * Saves a new user in the User collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Organization} user the user to be saved 
 * @returns {Promise<Organization>} a promise with the saved user
 */

export const saveNewOrganization = async function (context: BaseContext, organization: Organization): Promise<Organization> {
    const organizationRepository: Repository<Organization> = getManager().getRepository(Organization)

    try {
        return organizationRepository.save(organization)
    } catch (error) {
        logger.error('saveNewUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * Saves an updated user in the User collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Organization} organization the user to be saved
 * @returns {Promise<Organization>}  a promise with the saved updated user
 */
export const updateOrganization = async function (context: BaseContext, organization: Organization): Promise<Organization> {
    const organizationRepository: Repository<Organization> = getManager().getRepository(Organization)

    try {
        delete organization.createdAt

        return organizationRepository.save(organization)
    } catch (error) {
        logger.error('updateUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * @param  {BaseContext} context Koa context object
 * @param  {Organization} organization the user to be removed
 * @returns {Promise<Organization>} a promise with the removed user
 */
export const removeOrganization = async function (context: BaseContext, organization: Organization): Promise<Organization> {
    const organizationRepository: Repository<Organization> = getManager().getRepository(Organization)

    try {
        return organizationRepository.remove(organization)
    } catch (error) {
        logger.error('removeUser', { error })
        context.throw(new errors.InternalServerError())
    }
}