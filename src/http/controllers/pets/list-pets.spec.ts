import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should list pets', async () => {
    const createOrganizationResponse = await request(app.server)
      .post('/organizations')
      .send({
        name: 'Organização 1',
        email: 'sozoreaca@tehrajsoz.io',
        zip_code: '12345678',
        city: 'Campinas',
        address: 'Rua das Flores, 123',
        whatsapp: '123456789',
        password: '123456',
      })

    await request(app.server)
      .post('/pets')
      .send({
        name: 'Schwarzenegger',
        age: 'Filhote',
        energyLevel: 'Alta',
        size: 'Pequeno',
        independencyLevel: 'Alta',
        description: 'Cachorro muito brincalhão',
        environment: 'Casa',
        space: 'Pequeno',
        adoptionRequirements: ['Casa com quintal'],
        organizationId: createOrganizationResponse.body.organization.id,
        photo: 'https://fakephot.com',
      })

    await request(app.server)
      .post('/pets')
      .send({
        name: 'Van Damme',
        age: 'Filhote',
        energyLevel: 'Baixa',
        size: 'Pequeno',
        independencyLevel: 'Alta',
        description: 'Cachorro muito brincalhão',
        environment: 'Casa',
        space: 'Pequeno',
        adoptionRequirements: ['Casa com quintal'],
        organizationId: createOrganizationResponse.body.organization.id,
        photo: 'https://fakephot.com',
      })

    const response = await request(app.server).post('/pets/list').send({
      city: createOrganizationResponse.body.organization.city,
      energy_level: 'Alta',
      independency_level: 'Alta',
    })

    expect(response.error).toBeFalsy()
    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should not list pets if city is not provided', async () => {
    const response = await request(app.server).post('/pets/list').send({
      energy_level: 'Alta',
      independency_level: 'Alta',
    })

    expect(response.error).toBeTruthy()
    expect(response.status).toBe(400)
  })
})
