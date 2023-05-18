import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rocky',
        description: 'Um cão corajoso e brincalhão da raça Bulldog',
        age: 4,
        energyLevel: 5,
        size: 'LARGE',
        independenceLevel: 'LOW',
        environmentType: 'SPACIOUS',
      })

    expect(response.statusCode).toEqual(201)
  })
})
