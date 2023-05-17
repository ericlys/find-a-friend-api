import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.number(),
    energyLevel: z.number(),
    environmentType: z.enum(['INDOOR', 'OUTDOOR', 'SPACIOUS']),
    independenceLevel: z.enum(['LOW', 'HIGH', 'MEDIUM']),
    size: z.enum(['LARGE', 'MEDIUM', 'SMALL']),
  })

  const {
    name,
    description,
    age,
    energyLevel,
    environmentType,
    independenceLevel,
    size,
  } = registerBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    name,
    description,
    age,
    energyLevel,
    environmentType,
    independenceLevel,
    size,
    organizationId: request.user.sub,
  })

  return reply.status(201).send()
}
