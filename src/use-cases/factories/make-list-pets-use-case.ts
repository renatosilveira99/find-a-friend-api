import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { ListPetsUseCase } from '../list-pets'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeListPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()

  const listPets = new ListPetsUseCase(petsRepository, organizationsRepository)

  return listPets
}
