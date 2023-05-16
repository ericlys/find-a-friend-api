import { PrismaOrganizationRespository } from '@/repositories/prisma/prisma-organization-repository'
import { CreateOrganizationUseCase } from '../create-organization'

export function makeCreateOrganizationUseCase() {
  const prismaOrganizationRespository = new PrismaOrganizationRespository()
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    prismaOrganizationRespository,
  )

  return createOrganizationUseCase
}
