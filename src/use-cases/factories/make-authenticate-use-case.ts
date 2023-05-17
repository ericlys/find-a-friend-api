import { PrismaOrganizationRespository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrganizationRespository = new PrismaOrganizationRespository()
  const useCase = new AuthenticateUseCase(prismaOrganizationRespository)

  return useCase
}
