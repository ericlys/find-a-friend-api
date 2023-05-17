import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { AnimalSize, IndependenceLevel, Pet } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface FetchPetsUseCaseRequest {
  city: string
  state: string
  age?: number
  energy?: number
  size?: AnimalSize
  independence?: IndependenceLevel
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
    state,
    age,
    energy,
    independence,
    size,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const organizations = await this.organizationsRepository.findByLocation({
      city,
      state,
    })

    if (!organizations) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByQuery({
      orgs: organizations,
      age,
      energy,
      size,
      independence,
    })

    return { pets }
  }
}
