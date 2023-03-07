import { SwaggerRouter } from 'koa-swagger-decorator'
import { auth, user, organization } from '../controllers'

const unprotectedRouter = new SwaggerRouter()

// Auth
unprotectedRouter.post('/login', auth.loginUser)
unprotectedRouter.get('/refresh', auth.refreshToken)

// User
unprotectedRouter.post('/users', user.createUser)

// Organization
unprotectedRouter.post('/organizations', organization.createOrganization)

export { unprotectedRouter }
