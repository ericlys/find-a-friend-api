import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import path from 'path'
import { DiskStorage } from '@/providers/DiskStorage'

describe('Add Images (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    const diskStorage = new DiskStorage()

    const files = await diskStorage.listFiles()

    if (files) {
      for (const file of files) {
        diskStorage.deleteFile(file)
      }
    }

    await app.close()
  })

  it('should be able to add images in pet', async () => {
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

    const response = await request(app.server)
      .post('/pets/images')
      .set('content-type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .field('pet_id', pet!.id)
      .attach('images', filePath)

    expect(response.statusCode).toEqual(201)
    expect(response.body.petImages).toEqual([
      expect.objectContaining({ path: expect.any(String) }),
    ])
  })
})
