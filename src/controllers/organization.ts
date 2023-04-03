import { BaseContext } from 'koa'
import { request, summary, path, body, responses, tagsAll } from 'koa-swagger-decorator'
import { createOrganizationSchema, updateOrganizationSchema, requestOrganizationValidationSchema } from '../entities/organization/organization.schema'
import * as OrganizationService from '../services/organization'
import * as ValidationService from '../services/validate'
import { response } from '../libraries/helpers'
import { Organization } from '../entities/organization/organization'

@tagsAll(['User'])
export default class OrganizationController {
    @request('get', '/organizations')
    @summary('Find all organizations')
    @responses({
        200: { description: 'Success' },
        400: { description: 'Error' },
        401: { description: 'Token authorization error' },
        404: { description: 'organizations not found' },
    })
    public static async getOrganizations(context: BaseContext): Promise<void> {
        response(context, 200, await OrganizationService.findAllOrganizations(context, {}))
    }

    @request('get', '/organization/{id}')
    @summary('Find organization by id')
    @path({ id: { type: 'string', required: true, description: 'id of organization to fetch' } })
    @responses({
        200: { description: 'success' },
        400: { description: 'validation error, user not found' },
        401: { description: 'token authorization error' },
    })
    public static async getOrganization(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestOrganizationValidationSchema, [
            '_id',
        ])

        response(context, 200, await OrganizationService.findOrganization(context, { _id: context.params.id }))
    }

    @request('post', '/organizations')
    @summary('Create a organization')
    @body(createOrganizationSchema)
    @responses({
        200: { description: 'organization created successfully' },
        400: { description: 'missing parameters, invalid password, validation errors' },
        409: { description: 'organization already exists' },
    })
    public static async createOrganization(context: BaseContext): Promise<void> {
        const organizationToBeCreated = OrganizationService.createUpdateOrganizationModel(context)

        // await ValidationService.validateRequest(context, organizationToBeCreated, requestOrganizationValidationSchema, [
        //     'name',
        //     'email',
        //     'password',
        // ])
        await OrganizationService.checkIfOrganizationAlreadyExists(context, { name: organizationToBeCreated.name })
        await OrganizationService.saveNewOrganization(context, organizationToBeCreated)

        response(context, 200, { 'data': { 'id': organizationToBeCreated._id } })
    }

    @request('put', '/organizations/{id}')
    @summary('Update a organization')
    @path({ id: { type: 'string', required: true, description: 'id of user to update' } })
    @body(updateOrganizationSchema)
    @responses({
        200: { description: 'organization updated successfully' },
        400: { description: 'organization not found, organization already exists, validation errors, organization already exists' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async updateOrganization(context: BaseContext): Promise<void> {
        const organizationToBeCreated = OrganizationService.createUpdateOrganizationModel(context)

        await ValidationService.validateRequest(context, organizationToBeCreated, requestOrganizationValidationSchema, ['_id'])
        // await organizationToBeCreated.findUser(context, { _id: context.params.id })

        response(context, 200, (await OrganizationService.updateOrganization(context, organizationToBeCreated)))
    }

    @request('delete', '/organizations/{id}')
    @summary('Delete organization by id')
    @path({ id: { type: 'string', required: true, description: 'id of organization' } })
    @responses({
        204: { description: 'organization deleted successfully' },
        400: { description: 'organization not found, validation errors' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async deleteOrganization(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestOrganizationValidationSchema, [
            '_id',
        ])

        const organizationToRemove = await OrganizationService.findOrganization(context, { _id: context.params.id })

        await OrganizationService.removeOrganization(context, <Organization>organizationToRemove)

        response(context, 204)
    }
}
