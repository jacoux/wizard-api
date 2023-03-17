import { BaseContext } from 'koa'
import { request, summary, path, body, responses, tagsAll } from 'koa-swagger-decorator'
import { createProductSchema, updateProductSchema, requestProductValidationSchema } from '../entities/product/product.schema'
import * as ProductService from '../services/product'
import * as ValidationService from '../services/validate'
import { response } from '../libraries/helpers'
import { Product } from '../entities/product/product'

@tagsAll(['User'])
export default class ProductController {
    @request('get', '/products')
    @summary('Find all products')
    @responses({
        200: { description: 'Success' },
        400: { description: 'Error' },
        401: { description: 'Token authorization error' },
        404: { description: 'products not found' },
    })
    public static async getProducts(context: BaseContext): Promise<void> {
        response(context, 200, await ProductService.findAllProducts(context, {}))
    }

    @request('get', '/product/{id}')
    @summary('Find product by id')
    @path({ id: { type: 'string', required: true, description: 'id of product to fetch' } })
    @responses({
        200: { description: 'success' },
        400: { description: 'validation error, product not found' },
        401: { description: 'token authorization error' },
    })
    public static async getProduct(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestProductValidationSchema, [
            '_id',
        ])

        response(context, 200, await ProductService.findProduct(context, { _id: context.params.id }))
    }

    @request('post', '/products')
    @summary('Create a product')
    @body(createProductSchema)
    @responses({
        201: { description: 'product created successfully' },
        400: { description: 'missing parameters, invalid password, validation errors' },
        409: { description: 'product already exists' },
    })
    public static async createProduct(context: BaseContext): Promise<void> {
        const productToBeCreated = ProductService.createNewProductModel(context)

        console.log(productToBeCreated);
        await ValidationService.validateRequest(context, productToBeCreated, requestProductValidationSchema, [
            'name',
            'organizationId',
            'vatPercentage',
            'price',
        ])
        await ProductService.checkIfProductAlreadyExists(context, { name: productToBeCreated.name })
        await ProductService.saveNewProduct(context, productToBeCreated)

        response(context, 201, 'product created')
    }

    @request('put', '/products/{id}')
    @summary('Update a product')
    @path({ id: { type: 'string', required: true, description: 'id of user to update' } })
    @body(updateProductSchema)
    @responses({
        200: { description: 'product updated successfully' },
        400: { description: 'product not found, product already exists, validation errors, product already exists' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async updateProduct(context: BaseContext): Promise<void> {
        const productToBeCreated = ProductService.createUpdateProductModel(context)

        await ValidationService.validateRequest(context, productToBeCreated, requestProductValidationSchema, ['_id'])
        await ProductService.findProduct(context, { _id: context.params.id })

        response(context, 200, (await ProductService.updateProduct(context, productToBeCreated)))
    }

    @request('delete', '/products/{id}')
    @summary('Delete product by id')
    @path({ id: { type: 'string', required: true, description: 'id of product' } })
    @responses({
        204: { description: 'product deleted successfully' },
        400: { description: 'product not found, validation errors' },
        401: { description: 'token authorization error' },
        403: { description: 'not authorized to perform this action' },
    })
    public static async deleteProduct(context: BaseContext): Promise<void> {
        await ValidationService.validateRequest(context, { _id: context.params.id }, requestProductValidationSchema, [
            '_id',
        ])

        const productToRemove = await ProductService.findProduct(context, { _id: context.params.id })

        await ProductService.removeProduct(context, <Product>productToRemove)

        response(context, 204)
    }
}
