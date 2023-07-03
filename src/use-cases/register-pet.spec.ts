import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'node:crypto'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Alfredo',
      age: 'Filhote',
      energyLevel: 'Alta',
      size: 'Pequeno',
      independencyLevel: 'Baixa',
      description: 'Cachorro muito brincalhão',
      environment: 'Casa',
      space: 'Pequeno',
      adoptionRequirements: ['Casa com quintal'],
      organizationId: randomUUID(),
      photo: 'https://fakephot.com',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adoption_requirements).toEqual(['Casa com quintal'])
  })
})
