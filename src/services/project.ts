import shortid from 'shortid'
import { BaseContext } from 'koa'
import { getManager, Repository } from 'typeorm'
import { Project } from '../entities/project/project'
import * as errors from '../libraries/errors'
import { logger } from '../libraries/logger'


/**
 * Fetches all users in the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Array<Project>>} a promise with array of fetched users
 */
export const findAllProjects = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Array<Project>> {
    const projectRepository: Repository<Project> = getManager().getRepository(Project)
    let project = []

    try {
        project = await projectRepository.find(qryObj)
    } catch (error) {
        logger.error('findAllProjects', { error })
        context.throw(new errors.InternalServerError())
    }

    return project.map((project: Project): Project => project)
}

/**
 * Fetches a single user from the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Project|Project>} a promise with the fetched user
 */
export const findProject = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Project> {
    const projectRepository: Repository<Project> = getManager().getRepository(Project);

    let project

    try {
        project = await projectRepository.findOne(qryObj)
    } catch (error) {
        logger.error('findUser', { error })
        context.throw(new errors.InternalServerError())
    }

    if (!project) context.throw(new errors.ObjectNotFound('project '))

    return project
}

/**
 * Checks if the user already exists in the collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<void>} a void promise if user doesn't exists. throws error if user already exists 
 */
export const checkIfProjectAlreadyExists = async function (context: BaseContext, qryObj: Record<string, any>): Promise<void> {
    const projectRepository: Repository<Project> = getManager().getRepository(Project)

    try {
        if (!await projectRepository.findOne(qryObj)) return
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
 * @returns {Project} the created user model
 */
export const createNewProjectModel = function (context: BaseContext): Project {
    const project: Project = new Project()

    project._id = shortid.generate();
    project.name = context.request.body.name
    project.organizationId = context.request.body.organizationId
    project.projectNumber = context.request.body.projectNumber
    project.startDate = context.request.body.startDate
    project.endDate = context.request.body.endDate
    project.projectResponsiblePerson = context.request.body.projectResponsiblePerson
    project.amountOfProjectMembers = context.request.body.amountOfProjectMembers
    project.status = context.request.body.status
    project.currency = context.request.body.currency
    project.maxBudget = context.request.body.maxBudget
    project.currentBudget = context.request.body.currentBudget
    project.linkedProjects = context.request.body.linkedProjects
    project.invoices = context.request.body.linkedProjects
    project.description = context.request.body.description
    project.client = context.request.body.client

    return project
}

/**
 * Returns a new User model for saving an updated user
 * 
 * @param  {BaseContext} context Koa context object
 * @returns {Project} the created user model
 */
export const createUpdateProjectModel = function (context: BaseContext): Project {
    const project: Project = new Project()
    
    project._id = context.params.id
    project.name = context.request.body.name
    project.organizationId = context.request.body.organizationId
    project.projectNumber = context.request.body.projectNumber
    project.startDate = context.request.body.startDate
    project.endDate = context.request.body.endDate
    project.projectResponsiblePerson = context.request.body.projectResponsiblePerson
    project.amountOfProjectMembers = context.request.body.amountOfProjectMembers
    project.status = context.request.body.status
    project.currency = context.request.body.currency
    project.maxBudget = context.request.body.maxBudget
    project.currentBudget = context.request.body.currentBudget
    project.linkedProjects = context.request.body.linkedProjects
    project.invoices = context.request.body.linkedProjects
    project.description = context.request.body.description
    project.client = context.request.body.client

    // remove fields that should not be updated
    delete project.createdAt

    return project
}

/**
 * Saves a new user in the User collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Project} project the user to be saved 
 * @returns {Promise<Project>} a promise with the saved user
 */

export const saveNewProject = async function (context: BaseContext, project: Project): Promise<Project> {
    const projectRepository: Repository<Project> = getManager().getRepository(Project)

    try {
        return projectRepository.save(project)
    } catch (error) {
        logger.error('saveNewUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * Saves an updated project in the project collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Project} project the user to be saved
 * @returns {Promise<Project>}  a promise with the saved updated user
 */
export const updateProject = async function (context: BaseContext, project: Project): Promise<Project> {
    const projectRepository: Repository<Project> = getManager().getRepository(Project)

    try {
        delete project.createdAt

        return projectRepository.save(project)
    } catch (error) {
        logger.error('updateUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * @param  {BaseContext} context Koa context object
 * @param  {Project} project the user to be removed
 * @returns {Promise<Project>} a promise with the removed user
 */
export const removeProject = async function (context: BaseContext, project: Project): Promise<Project> {
    const projectRepository: Repository<Project> = getManager().getRepository(Project)

    try {
        return projectRepository.remove(project)
    } catch (error) {
        logger.error('removeUser', { error })
        context.throw(new errors.InternalServerError())
    }
}