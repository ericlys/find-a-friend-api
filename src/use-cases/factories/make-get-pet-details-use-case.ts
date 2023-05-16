import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetPetDetailsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetDetailsUseCase = new GetPetDetailsUseCase(prismaPetsRepository)

  return getPetDetailsUseCase
}
