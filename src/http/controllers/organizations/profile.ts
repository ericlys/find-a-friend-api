import { makeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = makeGetOrganizationProfileUseCase()

  const { organization } = await getOrganizationProfile.execute({
    organizationId: request.user.sub,
  })

  Reflect.deleteProperty(organization, 'password')

  return reply.status(200).send({ organization })
}
