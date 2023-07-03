import { FastifyInstance } from 'fastify'
import { createOrganization } from './create-organization'
import { createSession } from './session'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganization)
  app.post('/organizations/session', createSession)
}
