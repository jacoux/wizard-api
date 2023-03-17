import { SwaggerRouter } from 'koa-swagger-decorator'
import { user, auth, organization, client, project, invoice, product } from '../controllers'
import fs from 'fs'
import { minify } from 'html-minifier'

const description = fs.readFileSync(__dirname + '/swagger-description.html', 'utf8')

export const swaggerRouterOpts = {
    title: 'RESTful Typescript Koa',
    description: minify(description, { collapseWhitespace: true }),
    version: '1.0.0'
}

const protectedRouter = new SwaggerRouter()

// AUTH ROUTES
protectedRouter.get('/logout', auth.logoutUser)

// USER ROUTES
protectedRouter.get('/users', user.getUsers)
protectedRouter.get('/users/:id', user.getUser)
protectedRouter.put('/users/:id', user.updateUser)
protectedRouter.delete('/users/:id', user.deleteUser)

// ORGANIZATION ROUTES
protectedRouter.get('/organizations', organization.getOrganizations)
protectedRouter.get('/organizations/:id', organization.getOrganization)
protectedRouter.delete('/organizations/:id', organization.deleteOrganization)
protectedRouter.put('/organizations/:id', organization.updateOrganization)

// CLIENT ROUTES
protectedRouter.get('/clients/:id', client.getClient)
protectedRouter.delete('/clients/:id', client.deleteClient)
protectedRouter.put('/clients/:id', client.updateClient)
protectedRouter.post('/clients', client.createClient)

// PROJECT ROUTES
protectedRouter.get('/projects', project.getProjects)
protectedRouter.get('/projects/:id', project.getProject)
protectedRouter.delete('/projects/:id', project.deleteProject)
protectedRouter.put('/projects/:id', project.updateProject)
protectedRouter.post('/projects', project.createProject)

// INVOICE ROUTES
protectedRouter.get('/invoices', invoice.getInvoices)
protectedRouter.get('/invoices/:id', invoice.getInvoice)
protectedRouter.delete('/invoices/:id', invoice.deleteInvoice)
protectedRouter.put('/invoices/:id', invoice.updateInvoice)
protectedRouter.post('/invoices', invoice.createInvoice)

// INVOICE ROUTES
// protectedRouter.get('/products', product.getProducts)
protectedRouter.get('/invoices/:id', product.getProduct)
protectedRouter.delete('/invoices/:id', product.deleteProduct)
protectedRouter.put('/invoices/:id', product.updateProduct)
protectedRouter.post('/invoices', product.createProduct)


protectedRouter.swagger(swaggerRouterOpts)
protectedRouter.mapDir(__dirname + '/../')

export { protectedRouter }
