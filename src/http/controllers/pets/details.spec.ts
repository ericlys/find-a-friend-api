import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

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

    const { id } = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server).get(`/pets/${id}`).send()

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Rocky',
        description: 'Um cão corajoso e brincalhão da raça Bulldog',
        age: 4,
        energy_level: 5,
        size: 'LARGE',
        independence_level: 'LOW',
        environment_type: 'SPACIOUS',
        organization_id: expect.any(String),
      }),
    )
  })
})
