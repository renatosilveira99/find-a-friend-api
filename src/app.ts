import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'

import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'
import { organizationsRoutes } from './http/controllers/organizations/routes'

export const app = fastify()

app.register(fastifyCookie)

app.register(petsRoutes)
app.register(organizationsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error.message || JSON.stringify(error))
  } else {
    // TODO: Here we should log to an external tool like Datadog/Sentry
  }

  return reply
    .status(error.statusCode || 500)
    .send({ message: error.message || 'Internal Error' })
})
