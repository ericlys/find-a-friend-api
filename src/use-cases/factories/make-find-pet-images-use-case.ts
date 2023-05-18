import { PrismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository'
import { FindPetImagesUseCase } from '../find-pet-images'

export function makeFindPetImagesUseCase() {
  const prismaPetImagesRepository = new PrismaPetImagesRepository()
  const useCase = new FindPetImagesUseCase(prismaPetImagesRepository)

  return useCase
}
