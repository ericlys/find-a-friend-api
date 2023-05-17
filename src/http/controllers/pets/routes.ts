import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { Fetch } from './fetch'
import { Details } from './details'

export async function petsRouters(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, register)
  app.get('/pets', Fetch)
  app.get('/pets/:id', Details)
}
