import { PrismaOrganizationRespository } from '@/repositories/prisma/prisma-organization-repository'
import { GetOrganizationProfileUseCase } from '../get-organization-profile'

export function makeGetOrganizationProfileUseCase() {
  const organizationRespository = new PrismaOrganizationRespository()
  const useCase = new GetOrganizationProfileUseCase(organizationRespository)

  return useCase
}
