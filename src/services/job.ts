import shortid from 'shortid'
import { BaseContext } from 'koa'
import { getManager, Repository } from 'typeorm'
import { Job } from '../entities/job/job'
import * as errors from '../libraries/errors'
import { logger } from '../libraries/logger'

/**
 * Fetches all users in the user collection
 *
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Array<Job>>} a promise with array of fetched users
 */
export const findAllJobs = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Array<Job>> {
    const jobRepository: Repository<Job> = getManager().getRepository(Job)
    let job = []

    try {
        job = await jobRepository.find(qryObj)
    } catch (error) {
        logger.error('findAllJobs', { error })
        context.throw(new errors.InternalServerError())
    }

    return job.map((job: Job): Job => job)
}

/**
 * Fetches a single user from the user collection
 *
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<User|UserPublic>} a promise with the fetched user
 */
export const findJob = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Job> {
    const jobRepository: Repository<Job> = getManager().getRepository(Job)
    let job

    try {
        job = await jobRepository.findOne(qryObj)
    } catch (error) {
        logger.error('findUser', { error })
        context.throw(new errors.InternalServerError())
    }

    if (!job) context.throw(new errors.UserNotFound())

    return job
}

/**
 * Checks if the user already exists in the collection
 *
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<void>} a void promise if user doesn't exists. throws error if user already exists
 */
export const checkIfJobAlreadyExists = async function (
    context: BaseContext,
    qryObj: Record<string, any>,
): Promise<void> {
    const jobRepository: Repository<Job> = getManager().getRepository(Job)

    try {
        if (!(await jobRepository.findOne(qryObj))) return
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
 * @returns {Job} the created job model
 */
export const createNewJobModel = function (context: BaseContext): Job {
    const job: Job = new Job()

    job._id = shortid.generate()
    job.title = context.request.body.title
    job.department = context.request.body.department
    job.employmentRatio = context.request.body.employmentRatio
    job.maxAmountOfApplicants = context.request.body.maxAmountOfApplicants
    job.contractTerm = context.request.body.contractTerm || ''
    job.salaryPackage = context.request.body.salaryPackage || ''
    job.experience = context.request.body.experience || ''
    job.responsible = context.request.body.experience || ''
    job.location.streetName = context.request.body.location.streetName || ''
    job.location.streetNumber = context.request.body.location.streetNumber || ''
    job.location.streetBus = context.request.body.location.streetBus || ''
    job.location.city = context.request.body.location.city || ''
    job.location.postalCode = context.request.body.location.postalCode || ''
    job.location.country = context.request.body.location.country || ''
    job.description = context.request.body.description
    job.applicantForm.label = context.request.body.applicantForm.label
    job.applicantForm.field = context.request.body.applicantForm.field
    job.applicantForm = context.request.body.applicantForm.label
    job.applicantProcess.order = context.request.body.applicantProcess.order
    job.applicantProcess.field = context.request.body.applicantProcess.field
    job.applicantProcess.action = context.request.body.applicantProcess.action
    job.organizationId = context.request.body.organizationId
    job.status = context.request.body.status || '1'

    return job
}

/**
 * Returns a new User model for saving an updated user
 *
 * @param  {BaseContext} context Koa context object
 * @returns {Job} the created user model
 */
export const createUpdateJobModel = function (context: BaseContext): Job {
    const job: Job = new Job()

    job._id = context.params.id
    job.title = context.request.body.title
    job.department = context.request.body.department
    job.employmentRatio = context.request.body.employmentRatio
    job.maxAmountOfApplicants = context.request.body.maxAmountOfApplicants
    job.contractTerm = context.request.body.contractTerm || ''
    job.salaryPackage = context.request.body.salaryPackage || ''
    job.experience = context.request.body.experience || ''
    job.responsible = context.request.body.experience || ''
    job.location.streetName = context.request.body.location.streetName
    job.location.streetNumber = context.request.body.location.streetNumber
    job.location.streetBus = context.request.body.location.streetBus
    job.location.city = context.request.body.location.city
    job.location.postalCode = context.request.body.location.postalCode
    job.location.country = context.request.body.location.country
    job.description = context.request.body.description
    job.applicantForm.label = context.request.body.applicantForm.label
    job.applicantForm.field = context.request.body.applicantForm.field
    job.applicantForm = context.request.body.applicantForm.label
    job.applicantProcess.order = context.request.body.applicantProcess.order
    job.applicantProcess.field = context.request.body.applicantProcess.field
    job.applicantProcess.action = context.request.body.applicantProcess.action
    job.organizationId = context.request.body.organizationId
    job.status = context.request.body.status || '1'

    // remove fields that should not be updated
    delete job.createdAt

    return job
}

/**
 * Saves a new user in the User collection
 *
 * @param  {BaseContext} context Koa context object
 * @param  {Job} user the user to be saved
 * @returns {Promise<Job>} a promise with the saved user
 */

export const saveNewJob = async function (context: BaseContext, job: Job): Promise<Job> {
    const jobRepository: Repository<Job> = getManager().getRepository(Job)

    try {
        return jobRepository.save(job)
    } catch (error) {
        logger.error('saveNewUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * Saves an updated user in the User collection
 *
 * @param  {BaseContext} context Koa context object
 * @param  {Job} job the user to be saved
 * @returns {Promise<Job>}  a promise with the saved updated user
 */
export const updateJob = async function (context: BaseContext, job: Job): Promise<Job> {
    const jobRepository: Repository<Job> = getManager().getRepository(Job)

    try {
        delete job.createdAt

        return jobRepository.save(job)
    } catch (error) {
        logger.error('updateUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * @param  {BaseContext} context Koa context object
 * @param  {Job} job the user to be removed
 * @returns {Promise<Job>} a promise with the removed user
 */
export const removeJob = async function (context: BaseContext, job: Job): Promise<Job> {
    const jobRepository: Repository<Job> = getManager().getRepository(Job)

    try {
        return jobRepository.remove(job)
    } catch (error) {
        logger.error('removeUser', { error })
        context.throw(new errors.InternalServerError())
    }
}
