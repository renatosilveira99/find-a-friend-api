import { makeCreateSessionUseCase } from '@/use-cases/factories/make-session-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createSession(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSessionBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = createSessionBodySchema.parse(request.body)

  const createSessionUseCase = makeCreateSessionUseCase()

  const { organization } = await createSessionUseCase.execute({
    email,
    password,
  })

  return reply.status(200).send({ organization })
}
