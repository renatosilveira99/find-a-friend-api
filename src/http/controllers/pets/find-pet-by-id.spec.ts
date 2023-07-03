import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'

describe('Find Pet By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should find registered pet', async () => {
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

    const createdPet = await request(app.server)
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

    const response = await request(app.server).get(
      `/pets/${createdPet.body.pet.id}`,
    )

    expect(response.error).toBeFalsy()
    expect(response.status).toBe(200)
    expect(response.body.pet).toEqual(createdPet.body.pet)
  })

  it('should return 404 if pet is not found', async () => {
    const response = await request(app.server).get(`/pets/${randomUUID()}`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      error: 'Pet not found',
    })
  })
})
