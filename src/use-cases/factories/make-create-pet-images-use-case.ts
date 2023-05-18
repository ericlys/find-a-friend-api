import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetImagesUseCase } from '../create-pet-images'
import { PrismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository'

export function makeCreatePetImagesUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaPetImagesRepository = new PrismaPetImagesRepository()
  const useCase = new CreatePetImagesUseCase(
    prismaPetImagesRepository,
    prismaPetsRepository,
  )

  return useCase
}
