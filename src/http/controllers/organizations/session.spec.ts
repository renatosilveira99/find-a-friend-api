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

  it('should create a new session', async () => {
    const createdOrganizationResponse = await request(app.server)
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
      .post('/organizations/session')
      .send({
        email: createdOrganizationResponse.body.organization.email,
        password: createdOrganizationResponse.body.organization.password,
      })

    expect(response.error).toBeFalsy()
    expect(response.status).toBe(200)
    expect(response.body.organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new session with a non-existing organization', async () => {
    const response = await request(app.server)
      .post('/organizations/session')
      .send({
        email: 'fake-email@fake.com',
        password: 'wrong-password',
      })

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('Email/password does not match')
  })
})
