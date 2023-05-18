import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import path from 'path'

describe('Remove Images (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove a pet image', async () => {
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

    const pet = await prisma.pet.findFirst()
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'images',
      'pet1.jpg',
    )

    await request(app.server)
      .post('/pets/images')
      .set('content-type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .field('pet_id', pet!.id)
      .attach('images', filePath)

    const petWithImage = await request(app.server)
      .get(`/pets/${pet!.id}`)
      .send()

    expect(petWithImage.body.pet.pet_images).toHaveLength(1)

    const petImageId = petWithImage.body.pet.pet_images[0].id

    const response = await request(app.server)
      .delete('/pets/images')
      .set('Authorization', `Bearer ${token}`)
      .send({
        imgIds: [petImageId],
      })

    expect(response.statusCode).toEqual(201)

    const petWithOutImage = await request(app.server)
      .get(`/pets/${pet!.id}`)
      .send()

    expect(petWithOutImage.body.pet.pet_images).toHaveLength(0)
  })
})
