import { OrganizationAlreadyExistsError } from '@/use-cases/erros/organization-already-exists-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    contact_name: z.string(),
    email: z.string(),
    postal_code: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    mobile_number: z.string(),
    password: z.string(),
  })

  const {
    contact_name,
    email,
    mobile_number,
    password,
    city,
    latitude,
    longitude,
    postal_code,
    state,
    street,
  } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateOrganizationUseCase()

    await createUseCase.execute({
      contact_name,
      email,
      mobile_number,
      password,
      city,
      latitude,
      longitude,
      postal_code,
      state,
      street,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
