import { expect, describe, it, beforeEach } from 'vitest'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { ListPetsUseCase } from './list-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let petsRepository: PetsRepository
let organizationsRepository: OrganizationsRepository
let sut: ListPetsUseCase

describe('List Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new ListPetsUseCase(petsRepository, organizationsRepository)
  })

  it('should return null when no organizations are found in the city', async () => {
    const request = {
      city: 'Example City',
    }

    const result = await sut.execute(request)

    expect(result).toBeNull()
  })

  it('should return null when no pets are found in the organizations', async () => {
    const organization = await organizationsRepository.create({
      name: 'Organização 1',
      email: 'sozoreaca@tehrajsoz.io',
      zip_code: '12345678',
      city: 'Campinas',
      address: 'Rua das Flores, 123',
      whatsapp: '123456789',
      password: '123456',
    })

    const result = await sut.execute({
      city: organization.city,
    })

    expect(result).toBeNull()
  })

  it('should return filtered pets', async () => {
    const organization = await organizationsRepository.create({
      name: 'Organização 1',
      email: 'sozoreaca@tehrajsoz.io',
      zip_code: '12345678',
      city: 'Campinas',
      address: 'Rua das Flores, 123',
      whatsapp: '123456789',
      password: '123456',
    })

    const pet1 = await petsRepository.create({
      name: 'Alfredo',
      age: 'Filhote',
      energy_level: 'Alta',
      size: 'Pequeno',
      independency_level: 'Baixa',
      description: 'Cachorro muito brincalhão',
      environment: 'Casa',
      space: 'Pequeno',
      adoption_requirements: ['Casa com quintal'],
      organization_id: organization.id,
      photo: 'https://fakephot.com',
    })

    await petsRepository.create({
      name: 'Alfredo2',
      age: 'Filhote',
      energy_level: 'Baixa',
      size: 'Grande',
      independency_level: 'Alta',
      description: 'Cachorro muito brincalhão',
      environment: 'Casa',
      space: 'Pequeno',
      adoption_requirements: ['Casa com quintal'],
      organization_id: organization.id,
      photo: 'https://fakephot.com',
    })

    const pet3 = await petsRepository.create({
      name: 'Alfredo3',
      age: 'Filhote',
      energy_level: 'Alta',
      size: 'Pequeno',
      independency_level: 'Baixa',
      description: 'Cachorro muito brincalhão',
      environment: 'Casa',
      space: 'Pequeno',
      adoption_requirements: ['Casa com quintal'],
      organization_id: organization.id,
      photo: 'https://fakephot.com',
    })

    const result = await sut.execute({
      city: organization.city,
      energyLevel: 'Alta',
      size: 'Pequeno',
      independencyLevel: 'Baixa',
      age: 'Filhote',
    })

    expect(result).toEqual([pet1, pet3])
  })
})
