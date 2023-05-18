import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      contact_name: 'Pet Happy',
      email: 'pet.happy@email.com',
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'rua do meio',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: await hash('pass123', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'pet.happy@email.com',
    password: 'pass123',
  })

  const { token } = authResponse.body

  return { token }
}
