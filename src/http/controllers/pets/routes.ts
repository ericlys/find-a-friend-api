import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { MULTER } from '@/configs/upload'
import { addImages } from './add-images'
import { register } from './register'
import { Details } from './details'
import multer from 'fastify-multer'
import { Fetch } from './fetch'
import { removeImages } from './remove-images'

export async function petsRouters(app: FastifyInstance) {
  const upload = multer(MULTER)

  app.post('/pets', { onRequest: [verifyJWT] }, register)

  app.post(
    '/pets/images',
    { onRequest: [verifyJWT], preHandler: upload.array('images') },
    addImages,
  )

  app.delete('/pets/images', { onRequest: [verifyJWT] }, removeImages)

  app.get('/pets', Fetch)
  app.get('/pets/:id', Details)
}
