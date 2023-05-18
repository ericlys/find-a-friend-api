import { PetsImagesRepository } from '@/repositories/pet-images-repository'
import { PetImage } from '@prisma/client'

interface FindPetImagesUseCaseRequest {
  imagesIds: string[]
}

interface FindPetImagesUseCaseResponse {
  petImages: PetImage[]
}

export class FindPetImagesUseCase {
  constructor(private petsImagesRepository: PetsImagesRepository) {}

  async execute({
    imagesIds,
  }: FindPetImagesUseCaseRequest): Promise<FindPetImagesUseCaseResponse> {
    const petImages = await this.petsImagesRepository.findMany(imagesIds)

    return { petImages }
  }
}
