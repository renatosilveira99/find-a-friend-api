import { expect, describe, it, beforeEach } from 'vitest'
import { CreateSessionUseCase } from './session'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateSessionUseCase

describe('Create Session Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateSessionUseCase(organizationsRepository)
  })

  it('should be able to create a new session', async () => {
    const organization = await organizationsRepository.create({
      name: 'Organização 1',
      email: 'sozoreaca@tehrajsoz.io',
      zip_code: '12345678',
      city: 'Campinas',
      address: 'Rua das Flores, 123',
      whatsapp: '123456789',
      password: '123456',
    })

    const session = await sut.execute({
      email: organization.email,
      password: organization.password,
    })

    expect(session.organization.id).toEqual(organization.id)
  })

  it('should not be able to create a new session with a non-existing organization', async () => {
    await expect(() =>
      sut.execute({
        email: 'non-existing-email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to create a new session with a wrong password', async () => {
    const organization = await organizationsRepository.create({
      name: 'Organização 1',
      email: 'sozoreaca@tehrajsoz.io',
      zip_code: '12345678',
      city: 'Campinas',
      address: 'Rua das Flores, 123',
      whatsapp: '123456789',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email: organization.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
