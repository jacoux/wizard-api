import { BaseContext } from 'koa'
import { request, summary, path, body, responses, tagsAll } from 'koa-swagger-decorator'
import { createJobSchema, updateJobSchema, requestJobValidationSchema } from '../entities/job/job.schema'
import * as JobService from '../services/job'
import * as ValidationService from '../services/validate'
import { response } from '../libraries/helpers'
import { Job } from '../entities/job/job'

@tagsAll(['User'])
export default class JobController {
    @request('get', '/jobs')
    @summary('Find all jobs')
    @responses({
        200: { description: 'Success' },
        400: { description: 'Error' },
        401: { description: 'Token authorization error' },
        404: { description: 'jobs not found' },
    })
    public static async getJobs(context: BaseContext): Promise<void> {
        response(context, 200, await JobService.findAllJobs(context, {}))
    }

    @request('get', '/job/{id}')
    @summary('Find job by id')
    @path({ id: { type: 'string', required: true, description: 'id of job to fetch' } })
    @responses({
        200: { description: 'success' },
        400: { description: 'validation error, user not found' },
        401: { description: 'token authorization error' },
    })
    public static async getJob(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestJobValidationSchema, [
            '_id',
        ])

        response(context, 200, await JobService.findJob(context, { _id: context.params.id }))
    }

    @request('post', '/jobs')
    @summary('Create a job')
    @body(createJobSchema)
    @responses({
        200: { description: 'job created successfully' },
        400: { description: 'missing parameters, invalid password, validation errors' },
        409: { description: 'job already exists' },
    })
    public static async createJob(context: BaseContext): Promise<void> {
        const jobToBeCreated = JobService.createUpdateJobModel(context)

        // await ValidationService.validateRequest(context, jobToBeCreated, requestJobValidationSchema, [
        //     'name',
        //     'email',
        //     'password',
        // ])
        await JobService.checkIfJobAlreadyExists(context, { title: jobToBeCreated.title })
        await JobService.saveNewJob(context, jobToBeCreated)

        response(context, 200, { data: { id: jobToBeCreated._id.toString() } })
    }

    @request('put', '/jobs/{id}')
    @summary('Update a job')
    @path({ id: { type: 'string', required: true, description: 'id of user to update' } })
    @body(updateJobSchema)
    @responses({
        200: { description: 'job updated successfully' },
        400: { description: 'job not found, job already exists, validation errors, job already exists' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async updateJob(context: BaseContext): Promise<void> {
        const jobToBeCreated = JobService.createUpdateJobModel(context)

        await ValidationService.validateRequest(context, jobToBeCreated, requestJobValidationSchema, ['_id'])
        // await jobToBeCreated.findUser(context, { _id: context.params.id })

        response(context, 200, await JobService.updateJob(context, jobToBeCreated))
    }

    @request('delete', '/jobs/{id}')
    @summary('Delete job by id')
    @path({ id: { type: 'string', required: true, description: 'id of job' } })
    @responses({
        204: { description: 'job deleted successfully' },
        400: { description: 'job not found, validation errors' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async deleteJob(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestJobValidationSchema, [
            '_id',
        ])

        const jobToRemove = await JobService.findJob(context, { _id: context.params.id })

        await JobService.removeJob(context, <Job>jobToRemove)

        response(context, 204)
    }
}
