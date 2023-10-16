import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/register.controller'
import { AuthenticateController } from '@/http/controllers/authentcate.controller'

const authenticateController = new AuthenticateController()

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticateController.handle)
}
