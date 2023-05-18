import { PetsImagesRepository } from '@/repositories/pet-images-repository'

interface DeletePetImagesUseCaseRequest {
  petIds: string[]
}

export class DeletePetImagesUseCase {
  constructor(private petsImagesRepository: PetsImagesRepository) {}

  async execute({ petIds }: DeletePetImagesUseCaseRequest): Promise<void> {
    await this.petsImagesRepository.delete(petIds)
  }
}
