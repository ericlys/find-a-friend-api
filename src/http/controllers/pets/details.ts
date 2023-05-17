import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function Details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamSchema = z.object({
    id: z.string(),
  })

  const { id } = detailsParamSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  try {
    const { pet } = await getPetDetailsUseCase.execute(id)

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
