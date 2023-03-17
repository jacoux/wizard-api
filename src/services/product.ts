import shortid from 'shortid'
import { BaseContext } from 'koa'
import { getManager, Repository } from 'typeorm'
import { Product } from '../entities/product/product'
import * as errors from '../libraries/errors'
import { logger } from '../libraries/logger'


/**
 * Fetches all users in the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Array<Product>>} a promise with array of fetched users
 */
export const findAllProducts = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Array<Product>> {
    const productRepository: Repository<Product> = getManager().getRepository(Product)
    let product = []

    try {
        product = await productRepository.find(qryObj)
    } catch (error) {
        logger.error('findAllProducts', { error })
        context.throw(new errors.InternalServerError())
    }

    return product.map((product: Product): Product => product)
}

/**
 * Fetches a single user from the user collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<Product|Product>} a promise with the fetched user
 */
export const findProduct = async function (context: BaseContext, qryObj: Record<string, any>): Promise<Product> {
    const productRepository: Repository<Product> = getManager().getRepository(Product);

    let product

    try {
        product = await productRepository.findOne(qryObj)
    } catch (error) {
        logger.error('findUser', { error })
        context.throw(new errors.InternalServerError())
    }

    if (!product) context.throw(new errors.ObjectNotFound('product '))

    return product
}

/**
 * Checks if the user already exists in the collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Record<string, any>} qryObj a database query object
 * @returns {Promise<void>} a void promise if user doesn't exists. throws error if user already exists 
 */
export const checkIfProductAlreadyExists = async function (context: BaseContext, qryObj: Record<string, any>): Promise<void> {
    const productRepository: Repository<Product> = getManager().getRepository(Product)

    try {
        if (!await productRepository.findOne(qryObj)) return
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
 * @returns {Product} the created user model
 */
export const createNewProductModel = function (context: BaseContext): Product {
    const product: Product = new Product()

    product._id = shortid.generate();
    product.organizationId = context.request.body.organizationId
    product.name = context.request.body.name
    product.price = context.request.body.price
    product.vatPercentage = context.request.body.vatPercentage
    product.isHourlyRate = context.request.body.isHourlyRate
    product.description = context.request.body.description

    return product
}

/**
 * Returns a new User model for saving an updated user
 * 
 * @param  {BaseContext} context Koa context object
 * @returns {Product} the created user model
 */
export const createUpdateProductModel = function (context: BaseContext): Product {
    const product: Product = new Product()
    

    product._id = shortid.generate();
    product.organizationId = context.request.body.organizationId
    product.name = context.request.body.name
    product.price = context.request.body.price
    product.vatPercentage = context.request.body.vatPercentage
    product.isHourlyRate = context.request.body.isHourlyRate
    product.description = context.request.body.description

    // remove fields that should not be updated
    delete product.createdAt

    return product
}

/**
 * Saves a new user in the User collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Product} product the user to be saved 
 * @returns {Promise<Product>} a promise with the saved user
 */

export const saveNewProduct = async function (context: BaseContext, product: Product): Promise<Product> {
    const productRepository: Repository<Product> = getManager().getRepository(Product)

    try {
        return productRepository.save(product)
    } catch (error) {
        logger.error('saveNewUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * Saves an updated product in the product collection
 * 
 * @param  {BaseContext} context Koa context object
 * @param  {Product} product the user to be saved
 * @returns {Promise<Product>}  a promise with the saved updated user
 */
export const updateProduct = async function (context: BaseContext, product: Product): Promise<Product> {
    const productRepository: Repository<Product> = getManager().getRepository(Product)

    try {
        delete product.createdAt

        return productRepository.save(product)
    } catch (error) {
        logger.error('updateUser', { error })
        context.throw(new errors.InternalServerError())
    }
}

/**
 * @param  {BaseContext} context Koa context object
 * @param  {Product} product the user to be removed
 * @returns {Promise<Product>} a promise with the removed user
 */
export const removeProduct = async function (context: BaseContext, product: Product): Promise<Product> {
    const productRepository: Repository<Product> = getManager().getRepository(Product)

    try {
        return productRepository.remove(product)
    } catch (error) {
        logger.error('removeUser', { error })
        context.throw(new errors.InternalServerError())
    }
}