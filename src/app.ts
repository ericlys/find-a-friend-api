import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import fastifyCookie from '@fastify/cookie'
import { petsRouters } from './http/controllers/pets/routes'
import multer from 'fastify-multer'
import fastifyStatic from '@fastify/static'
import { UPLOADS_FOLDER } from './configs/upload'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(multer.contentParser)

app.register(fastifyStatic, {
  root: UPLOADS_FOLDER,
  prefix: '/images',
})

app.register(organizationsRoutes)
app.register(petsRouters)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Todo: here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
