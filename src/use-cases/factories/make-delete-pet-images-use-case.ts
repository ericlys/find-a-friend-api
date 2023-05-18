import { PrismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository'
import { DeletePetImagesUseCase } from '../delete-pet-images'

export function makeDeletePetImagesUseCase() {
  const prismaPetImagesRepository = new PrismaPetImagesRepository()
  const useCase = new DeletePetImagesUseCase(prismaPetImagesRepository)

  return useCase
}
