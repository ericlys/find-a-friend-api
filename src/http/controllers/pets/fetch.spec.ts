import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fido',
        description: 'Um adorável cachorro da raça Shih-tzu',
        age: 3,
        energyLevel: 3,
        size: 'SMALL',
        independenceLevel: 'LOW',
        environmentType: 'INDOOR',
      })

    await request(app.server)
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

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'São Paulo',
        state: 'SP',
        page: 1,
        amount: 10,
        age: 4,
        energy: 5,
      })
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Rocky',
      }),
    ])
  })
})
