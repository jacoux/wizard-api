import { SwaggerRouter } from 'koa-swagger-decorator'
import { auth, user, organization,client, product } from '../controllers'

const unprotectedRouter = new SwaggerRouter()

// Auth
unprotectedRouter.post('/login', auth.loginUser)
unprotectedRouter.get('/refresh', auth.refreshToken)

// User
unprotectedRouter.post('/users', user.createUser)

//
unprotectedRouter.get('/clients', client.getClients)

//product
unprotectedRouter.get('/products', product.getProducts)

unprotectedRouter.get('/organizations/', organization.getOrganizations)

// Organization
unprotectedRouter.post('/organizations', organization.createOrganization)

export { unprotectedRouter }
