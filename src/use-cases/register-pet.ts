import { PetsRepository } from '@/repositories/pets-repository'
import {
  AnimalSize,
  EnvironmentType,
  IndependenceLevel,
  Pet,
} from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: number
  energyLevel: number
  size: AnimalSize
  independenceLevel: IndependenceLevel
  environmentType: EnvironmentType
  organizationId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    energyLevel,
    size,
    independenceLevel,
    environmentType,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      energy_level: energyLevel,
      size,
      independence_level: independenceLevel,
      environment_type: environmentType,
      organization_id: organizationId,
    })

    return { pet }
  }
}
