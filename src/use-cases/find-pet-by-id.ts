import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<Pet | null> {
    const pet = await this.petsRepository.findById(id)

    return pet || null
  }
}
