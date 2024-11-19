import shortid from 'shortid'
import { BaseContext } from 'koa'
import { getManager, Repository } from 'typeorm'
import { Client } from '../entities/client/client'
import * as errors from '../libraries/errors'
import { logger } from '../libraries/logger'


/**
 * Fetches all users in the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Array<Client>>} a promise with array of fetched users
 */
export const findAllClients = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Array<Client>> {
    const clientRepository: Repository<Client> = getManager().getRepository(Client)
    let client = []

    try {
        client = await clientRepository.find(qryObj)
    } catch (error) {
        logger.error('findAllClients', { error })
        context.throw(new errors.InternalServerError())
    }

    return client.map((client: Client): Client => client)
}

/**
 * Fetches a single user from the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Client|Client>} a promise with the fetched user
 */
export const findClient = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Client> {
    const clientRepository: Repository<Client> = getManager().getRepository(Client);

    let client

    try {
        client = await clientRepository.findOne(qryObj)
    } catch (error) {
        logger.error('findUser', { error })
        context.throw(new errors.InternalServerError())
    }

    if (!client) context.throw(new errors.ObjectNotFound('client '))

    return client
}

/**
 * Checks if the user already exists in the collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<void>} a void promise if user doesn't exists. throws error if user already exists 
 */
export const checkIfClientAlreadyExists = async function (context: BaseContext, qryObj: Record<string, any>): Promise<void> {
    const clientRepository: Repository<Client> = getManager().getRepository(Client)

    try {
        if (!await clientRepository.findOne(qryObj)) return
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
 * @returns {Client} the created user model
 */
export const createNewClientModel = function (context: BaseContext): Client {
    const client: Client = new Client()

    client._id = shortid.generate();
    client.name = context.request.body.name
    client.organizationId = context.request.body.organizationId
    client.vat = context.request.body.vat
    client.email = context.request.body.email
    client.tel = context.request.body.tel
    client.responsible = context.request.body.responsible
    client.firstName = context.request.body.firstName
    client.lastName = context.request.body.lastName
    client.address = context.request.body.address || ''
    client.description = context.request.body.description || ''

    return client
}

/**
 * Returns a new User model for saving an updated user
 * 
 * @param  {BaseContext} context Koa context object
 * @returns {Client} the created user model
 */
export const createUpdateClientModel = function (context: BaseContext): Client {
    const client: Client = new Client()

    client._id = context.params.id
    client.name = context.request.body.name
    client.organizationId = context.request.body.organizationId
    client.vat = context.request.body.vat
    client.email = context.request.body.email
    client.tel = context.request.body.tel
    client.responsible = context.request.body.responsible
    client.firstName = context.request.body.firstName
    client.lastName = context.request.body.lastName
    client.address = context.request.body.address
    client.description = context.request.body.description

    // remove fields that should not be updated
    delete client.createdAt

    return client
}

/**
 * Saves a new user in the User collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Client} client the user to be saved 
 * @returns {Promise<Client>} a promise with the saved user
 */

export const saveNewClient = async function (context: BaseContext, client: Client): Promise<Client> {
    const clientRepository: Repository<Client> = getManager().getRepository(Client)

    try {
        return clientRepository.save(client)
    } catch (error) {
        logger.error('saveNewUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * Saves an updated client in the client collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Client} user the user to be saved
 * @returns {Promise<Client>}  a promise with the saved updated user
 */
export const updateClient = async function (context: BaseContext, client: Client): Promise<Client> {
    const clientRepository: Repository<Client> = getManager().getRepository(Client)

    try {
        delete client.createdAt

        return clientRepository.save(client)
    } catch (error) {
        logger.error('updateUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * @param  {BaseContext} context Koa context object
 * @param  {Client} client the user to be removed
 * @returns {Promise<Client>} a promise with the removed user
 */
export const removeClient = async function (context: BaseContext, client: Client): Promise<Client> {
    const clientRepository: Repository<Client> = getManager().getRepository(Client)

    try {
        return clientRepository.remove(client)
    } catch (error) {
        logger.error('removeUser', { error })
        context.throw(new errors.InternalServerError())
    }
}