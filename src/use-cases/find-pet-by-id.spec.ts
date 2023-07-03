import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'node:crypto'
import { FindPetByIdUseCase } from './find-pet-by-id'

let petsRepository: InMemoryPetsRepository
let sut: FindPetByIdUseCase

describe('Find Pet By Id Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetByIdUseCase(petsRepository)
  })

  it('should be able to find a pet by id', async () => {
    const pet = await petsRepository.create({
      name: 'Alfredo',
      age: 'Filhote',
      energy_level: 'Alta',
      size: 'Pequeno',
      independency_level: 'Baixa',
      description: 'Cachorro muito brincalhão',
      environment: 'Casa',
      space: 'Pequeno',
      adoption_requirements: ['Casa com quintal'],
      organization_id: randomUUID(),
      photo: 'https://fakephot.com',
    })

    const foundPet = await sut.execute(pet.id)

    expect(foundPet).toEqual(pet)
  })

  it('should return null if pet is not found', async () => {
    const foundPet = await sut.execute('non-existing-id')

    expect(foundPet).toBeNull()
  })
})
