import { BaseContext } from 'koa'
import { request, summary, path, body, responses, tagsAll } from 'koa-swagger-decorator'
import { createProjectSchema, updateProjectSchema, requestProjectValidationSchema } from '../entities/project/project.schema'
import * as ProjectService from '../services/project'
import * as ValidationService from '../services/validate'
import { response } from '../libraries/helpers'
import { Project } from '../entities/project/project'

@tagsAll(['User'])
export default class ProjectController {
    @request('get', '/projects')
    @summary('Find all projects')
    @responses({
        200: { description: 'Success' },
        400: { description: 'Error' },
        401: { description: 'Token authorization error' },
        404: { description: 'projects not found' },
    })
    public static async getProjects(context: BaseContext): Promise<void> {
        response(context, 200, await ProjectService.findAllProjects(context, {}))
    }

    @request('get', '/project/{id}')
    @summary('Find project by id')
    @path({ id: { type: 'string', required: true, description: 'id of project to fetch' } })
    @responses({
        200: { description: 'success' },
        400: { description: 'validation error, project not found' },
        401: { description: 'token authorization error' },
    })
    public static async getProject(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestProjectValidationSchema, [
            '_id',
        ])

        response(context, 200, await ProjectService.findProject(context, { _id: context.params.id }))
    }

    @request('post', '/projects')
    @summary('Create a project')
    @body(createProjectSchema)
    @responses({
        201: { description: 'project created successfully' },
        400: { description: 'missing parameters, invalid password, validation errors' },
        409: { description: 'project already exists' },
    })
    public static async createProject(context: BaseContext): Promise<void> {
        const projectToBeCreated = ProjectService.createNewProjectModel(context)

        console.log(projectToBeCreated);
        await ValidationService.validateRequest(context, projectToBeCreated, requestProjectValidationSchema, [
            'name',
        ])
        await ProjectService.checkIfProjectAlreadyExists(context, { name: projectToBeCreated.name })
        await ProjectService.saveNewProject(context, projectToBeCreated)

        response(context, 201, 'project created')
    }

    @request('put', '/projects/{id}')
    @summary('Update a project')
    @path({ id: { type: 'string', required: true, description: 'id of user to update' } })
    @body(updateProjectSchema)
    @responses({
        200: { description: 'project updated successfully' },
        400: { description: 'project not found, project already exists, validation errors, project already exists' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async updateProject(context: BaseContext): Promise<void> {
        const projectToBeCreated = ProjectService.createUpdateProjectModel(context)

        await ValidationService.validateRequest(context, projectToBeCreated, requestProjectValidationSchema, ['_id'])
        await ProjectService.findProject(context, { _id: context.params.id })

        response(context, 200, (await ProjectService.updateProject(context, projectToBeCreated)))
    }

    @request('delete', '/projects/{id}')
    @summary('Delete project by id')
    @path({ id: { type: 'string', required: true, description: 'id of project' } })
    @responses({
        204: { description: 'project deleted successfully' },
        400: { description: 'project not found, validation errors' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async deleteProject(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestProjectValidationSchema, [
            '_id',
        ])

        const projectToRemove = await ProjectService.findProject(context, { _id: context.params.id })

        await ProjectService.removeProject(context, <Project>projectToRemove)

        response(context, 204)
    }
}
