import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/organizations').send({
      contact_name: 'Pet Happy',
      email: 'pet.happy@email.com',
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'rua do meio',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: 'pass123',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'pet.happy@email.com',
      password: 'pass123',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
