import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'
import { PrismaOrganizationRespository } from '@/repositories/prisma/prisma-organization-repository'

export function makeFetchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrganizationRespository = new PrismaOrganizationRespository()

  const fetchPetsUseCase = new FetchPetsUseCase(
    prismaPetsRepository,
    prismaOrganizationRespository,
  )

  return fetchPetsUseCase
}
