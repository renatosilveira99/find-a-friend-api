import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe.only('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should register the new pet', async () => {
    const createOrganizationResponse = await request(app.server)
      .post('/organizations')
      .send({
        name: 'Organização 1',
        email: 'sozoreaca@tehrajsoz.io',
        zip_code: '12345678',
        city: 'São Paulo',
        address: 'Rua das Flores, 123',
        whatsapp: '123456789',
        password: '123456',
      })

    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Alfredo',
        age: 'Filhote',
        energyLevel: 'Alta',
        size: 'Pequeno',
        independencyLevel: 'Baixa',
        description: 'Cachorro muito brincalhão',
        environment: 'Casa',
        space: 'Pequeno',
        adoptionRequirements: ['Casa com quintal'],
        organizationId: createOrganizationResponse.body.organization.id,
        photo: 'https://fakephot.com',
      })

    expect(response.error).toBeFalsy()
    expect(response.status).toBe(201)
    expect(response.body.pet.id).toEqual(expect.any(String))
  })
})
