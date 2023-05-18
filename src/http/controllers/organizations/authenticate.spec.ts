import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      contact_name: 'Pet Happy',
      email: 'pet.heppy@email.com',
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'rua do meio',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: 'pass123',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'pet.heppy@email.com',
      password: 'pass123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
