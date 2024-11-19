import { BaseContext } from 'koa'
import { request, summary, path, body, responses, tagsAll } from 'koa-swagger-decorator'
import { createClientSchema, updateClientSchema, requestClientValidationSchema } from '../entities/client/client.schema'
import * as ClientService from '../services/client'
import * as ValidationService from '../services/validate'
import { response } from '../libraries/helpers'
import { Client } from '../entities/client/client'

@tagsAll(['User'])
export default class ClientController {
    @request('get', '/clients')
    @summary('Find all clients')
    @responses({
        200: { description: 'Success' },
        400: { description: 'Error' },
        401: { description: 'Token authorization error' },
        404: { description: 'clients not found' },
    })
    public static async getClients(context: BaseContext): Promise<void> {
        response(context, 200, await ClientService.findAllClients(context, {}))
    }

    @request('get', '/client/{id}')
    @summary('Find client by id')
    @path({ id: { type: 'string', required: true, description: 'id of client to fetch' } })
    @responses({
        200: { description: 'success' },
        400: { description: 'validation error, user not found' },
        401: { description: 'token authorization error' },
    })
    public static async getClient(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestClientValidationSchema, [
            '_id',
        ])

        response(context, 200, await ClientService.findClient(context, { _id: context.params.id }))
    }

    @request('post', '/clients')
    @summary('Create a client')
    @body(createClientSchema)
    @responses({
        201: { description: 'client created successfully' },
        400: { description: 'missing parameters, invalid password, validation errors' },
        409: { description: 'client already exists' },
    })
    public static async createClient(context: BaseContext): Promise<void> {
        const clientToBeCreated = ClientService.createUpdateClientModel(context)

        // await ValidationService.validateRequest(context, clientToBeCreated, requestClientValidationSchema, [
        //     'name',
        //     'email',
        //     'password',
        // ])
        await ClientService.checkIfClientAlreadyExists(context, { name: clientToBeCreated.name })
        await ClientService.saveNewClient(context, clientToBeCreated)

        response(context, 201, 'client created')
    }

    @request('put', '/clients/{id}')
    @summary('Update a client')
    @path({ id: { type: 'string', required: true, description: 'id of user to update' } })
    @body(updateClientSchema)
    @responses({
        200: { description: 'client updated successfully' },
        400: { description: 'client not found, client already exists, validation errors, client already exists' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async updateClient(context: BaseContext): Promise<void> {
        const clientToBeCreated = ClientService.createUpdateClientModel(context)

        await ValidationService.validateRequest(context, clientToBeCreated, requestClientValidationSchema, ['_id'])
        // await clientToBeCreated.findUser(context, { _id: context.params.id })

        response(context, 200, (await ClientService.updateClient(context, clientToBeCreated)))
    }

    @request('delete', '/clients/{id}')
    @summary('Delete client by id')
    @path({ id: { type: 'string', required: true, description: 'id of client' } })
    @responses({
        204: { description: 'client deleted successfully' },
        400: { description: 'client not found, validation errors' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async deleteClient(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestClientValidationSchema, [
            '_id',
        ])

        const clientToRemove = await ClientService.findClient(context, { _id: context.params.id })

        await ClientService.removeClient(context, <Client>clientToRemove)

        response(context, 204)
    }
}
