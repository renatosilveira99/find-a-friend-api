import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { findPetById } from './find-pet-by-id'
import { listPets } from './list-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
  app.get('/pets/:id', findPetById)
  app.post('/pets/list', listPets)
}
