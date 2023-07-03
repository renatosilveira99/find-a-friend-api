import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IPetFindParams, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findManyByOrganizationIds(
    organizationIds: string[],
  ): Promise<Pet[] | null> {
    const pets = this.items.filter((pet) =>
      organizationIds.includes(pet.organization_id),
    )

    return pets || null
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id)

    return pet || null
  }

  async findBy(data: IPetFindParams): Promise<Pet[] | null> {
    const { age, energyLevel, size, independencyLevel } = data

    const pets = this.items.filter((pet) => {
      if (age && pet.age !== age) return false
      if (energyLevel && pet.energy_level !== energyLevel) return false
      if (size && pet.size !== size) return false
      if (independencyLevel && pet.independency_level !== independencyLevel)
        return false

      return true
    })

    return pets || null
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      age: data.age,
      description: data.description,
      energy_level: data.energy_level,
      environment: data.environment,
      independency_level: data.independency_level,
      photo: data.photo,
      size: data.size,
      space: data.space,
      name: data.name,
      adoption_requirements: data.adoption_requirements as unknown as string[],
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }
}
