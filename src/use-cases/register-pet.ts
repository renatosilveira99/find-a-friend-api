import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: string
  photo: string
  energyLevel: string
  size: string
  space: string
  independencyLevel: string
  environment: string
  adoptionRequirements: string[]
  organizationId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    photo,
    energyLevel,
    size,
    space,
    independencyLevel,
    environment,
    adoptionRequirements,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      photo,
      energy_level: energyLevel,
      size,
      space,
      independency_level: independencyLevel,
      environment,
      adoption_requirements: adoptionRequirements,
      organization_id: organizationId,
    })

    return { pet }
  }
}
