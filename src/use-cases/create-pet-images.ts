import { PetsImagesRepository } from '@/repositories/pet-images-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetImage } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface CreatePetImagesUseCaseRequest {
  path: string
  pet_id: string
}

interface CreatePetImagesUseCaseResponse {
  petImage: PetImage
}

export class CreatePetImagesUseCase {
  constructor(
    private petsImagesRepository: PetsImagesRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    path,
    pet_id,
  }: CreatePetImagesUseCaseRequest): Promise<CreatePetImagesUseCaseResponse> {
    const petExists = await this.petsRepository.findById(pet_id)

    if (!petExists) {
      throw new ResourceNotFoundError()
    }

    const petImage = await this.petsImagesRepository.create({
      path,
      pet_id,
    })

    return { petImage }
  }
}
