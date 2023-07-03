import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string().min(2).max(255),
    age: z.enum(['Filhote', 'Adulto', 'Idoso']),
    energyLevel: z.enum(['Baixa', 'Média', 'Alta']),
    size: z.enum(['Pequeno', 'Médio', 'Grande']),
    independencyLevel: z.enum(['Baixa', 'Média', 'Alta']),
    description: z.string().min(2).max(255),
    environment: z.enum(['Ambiente amplo', 'Casa', 'Apartamento']),
    space: z.enum(['Pequeno', 'Médio', 'Grande']),
    adoptionRequirements: z.array(z.string().min(2).max(255)),
    organizationId: z.string().uuid(),
    photo: z.string().url(),
  })

  const {
    name,
    age,
    energyLevel,
    size,
    independencyLevel,
    description,
    environment,
    space,
    adoptionRequirements,
    organizationId,
    photo,
  } = registerBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  const { pet } = await registerPetUseCase.execute({
    name,
    age,
    energyLevel,
    size,
    independencyLevel,
    description,
    environment,
    space,
    adoptionRequirements,
    organizationId,
    photo,
  })

  return reply.status(201).send({ pet })
}
