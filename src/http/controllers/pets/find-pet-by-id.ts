import { makeFindPetByIdUseCase } from '@/use-cases/factories/make-find-pet-by-id-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function findPetById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findPetByIdParamsSchema.parse(request.params)

  const findPetByIdUseCase = makeFindPetByIdUseCase()

  const pet = await findPetByIdUseCase.execute(id)

  return pet
    ? reply.status(200).send({ pet })
    : reply.status(404).send({ error: 'Pet not found' })
}
