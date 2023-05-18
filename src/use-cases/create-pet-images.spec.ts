import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemorePetImagesRepository } from '@/repositories/in-memory/in-memory-pet-images-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetImagesUseCase } from './create-pet-images'
import { AnimalSize, EnvironmentType, IndependenceLevel } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let petsRepository: InMemoryPetRepository
let petsImagesRepository: InMemorePetImagesRepository
let sut: CreatePetImagesUseCase

describe('Create Pet Images Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    petsImagesRepository = new InMemorePetImagesRepository()
    sut = new CreatePetImagesUseCase(petsImagesRepository, petsRepository)
  })

  it('should be able to insert images in a pet', async () => {
    const { id } = await petsRepository.create({
      name: 'Fido',
      description: 'Um adorável cachorro da raça Shih-tzu',
      age: 3,
      energy_level: 3,
      size: AnimalSize.SMALL,
      independence_level: IndependenceLevel.LOW,
      environment_type: EnvironmentType.INDOOR,
      organization_id: '123456789',
    })

    const { petImage } = await sut.execute({
      path: '3452345234fa323_pet_path.jpg',
      pet_id: id,
    })

    expect(petImage.id).toEqual(expect.any(String))
  })

  it('should not be able to insert images in a inexistent pet', async () => {
    await expect(() =>
      sut.execute({
        path: '3452345234fa323_pet_path.jpg',
        pet_id: 'fake_pet',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
