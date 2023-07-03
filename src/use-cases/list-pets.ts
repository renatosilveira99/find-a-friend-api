import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

interface ListPetsUseCaseRequest {
  city: string
  age?: string
  energyLevel?: string
  size?: string
  independencyLevel?: string
}

export class ListPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
    age,
    energyLevel,
    size,
    independencyLevel,
  }: ListPetsUseCaseRequest): Promise<Pet[] | null> {
    const organizations = await this.organizationsRepository.findManyByCity(
      city,
    )

    if (!organizations || organizations.length === 0) {
      return null
    }

    const pets = await this.petsRepository.findManyByOrganizationIds(
      organizations.map((organization) => organization.id),
    )

    if (!pets || pets.length === 0) {
      return null
    }

    const filteredPets = pets.filter((pet) => {
      if (age && pet.age !== age) return false
      if (energyLevel && pet.energy_level !== energyLevel) return false
      if (size && pet.size !== size) return false
      if (independencyLevel && pet.independency_level !== independencyLevel)
        return false

      return true
    })

    return filteredPets || null
  }
}
