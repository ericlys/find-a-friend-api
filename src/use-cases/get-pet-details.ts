import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
