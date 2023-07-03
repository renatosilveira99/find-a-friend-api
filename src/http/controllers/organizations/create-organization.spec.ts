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

  it('should create a new organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'Organização 1',
      email: 'sozoreaca@tehrajsoz.io',
      zip_code: '12345678',
      city: 'São Paulo',
      address: 'Rua das Flores, 123',
      whatsapp: '123456789',
      password: '123456',
    })

    expect(response.error).toBeFalsy()
    expect(response.status).toBe(201)
    expect(response.body.organization.id).toEqual(expect.any(String))
  })
})
