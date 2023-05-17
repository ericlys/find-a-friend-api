import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function Fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.coerce.number().optional(),
    energy: z.coerce.number().optional(),
    independence: z.enum(['LOW', 'HIGH', 'MEDIUM']).optional(),
    size: z.enum(['LARGE', 'MEDIUM', 'SMALL']).optional(),
  })

  const params = fetchQuerySchema.parse(request.query)

  const registerPetUseCase = makeFetchPetsUseCase()

  try {
    const { pets } = await registerPetUseCase.execute({
      ...params,
    })

    return reply.status(201).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ pets: [] })
    }

    throw err
  }
}
