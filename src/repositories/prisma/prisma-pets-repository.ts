import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { IPetFindParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findManyByOrganizationIds(
    organizationIds: string[],
  ): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: organizationIds,
        },
      },
    })

    return pets || null
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet || null
  }

  async findBy(data: IPetFindParams): Promise<Pet[] | null> {
    const { age, energyLevel, size, independencyLevel, organizationId } = data

    const pets = await prisma.pet.findMany({
      where: {
        age,
        energy_level: energyLevel,
        size,
        independency_level: independencyLevel,
        organization_id: organizationId,
      },
    })

    return pets || null
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
