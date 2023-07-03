import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    zip_code: z.string(),
    city: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  })

  const { name, email, zip_code, address, whatsapp, password, city } =
    createOrganizationBodySchema.parse(request.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  const { organization } = await createOrganizationUseCase.execute({
    name,
    email,
    zip_code,
    city,
    address,
    whatsapp,
    password,
  })

  return reply.status(201).send({ organization })
}
