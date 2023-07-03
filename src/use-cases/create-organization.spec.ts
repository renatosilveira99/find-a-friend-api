import { expect, describe, it, beforeEach } from 'vitest'

import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a new organization', async () => {
    const organization = await sut.execute({
      name: 'Organização 1',
      email: 'sozoreaca@tehrajsoz.io',
      zip_code: '12345678',
      city: 'Campinas',
      address: 'Rua das Flores, 123',
      whatsapp: '123456789',
      password: '123456',
    })

    expect(organization.organization.id).toEqual(expect.any(String))
    expect(organization.organization.name).toEqual('Organização 1')
  })
})
