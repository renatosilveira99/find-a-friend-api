import { makeListPetsUseCase } from '@/use-cases/factories/make-list-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const listPetsBodySchema = z.object({
    city: z.string(),
    energy_level: z.string().optional(),
    size: z.string().optional(),
    independency_level: z.string().optional(),
    age: z.string().optional(),
  })

  const { city, energy_level, size, independency_level, age } =
    listPetsBodySchema.parse(request.body)

  const listPetsUseCase = makeListPetsUseCase()

  const pets = await listPetsUseCase.execute({
    city,
    energyLevel: energy_level,
    size,
    independencyLevel: independency_level,
    age,
  })

  return pets
    ? reply.status(200).send({ pets })
    : reply.status(404).send({ error: 'Pets not found' })
}
