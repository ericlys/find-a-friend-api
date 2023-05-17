import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/profile', { onRequest: [verifyJWT] }, profile)
}
