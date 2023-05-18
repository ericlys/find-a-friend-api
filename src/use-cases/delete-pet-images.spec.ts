import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorePetImagesRepository } from '@/repositories/in-memory/in-memory-pet-images-repository'
import { DeletePetImagesUseCase } from './delete-pet-images'

let petsImagesRepository: InMemorePetImagesRepository
let sut: DeletePetImagesUseCase

describe('Delete Pet Images Use Case', () => {
  beforeEach(() => {
    petsImagesRepository = new InMemorePetImagesRepository()
    sut = new DeletePetImagesUseCase(petsImagesRepository)
  })

  it('should be able to delete pet images', async () => {
    await petsImagesRepository.create({
      path: '3452345234fa323_pet_path.jpg',
      pet_id: 'pet_id',
    })

    await sut.execute({
      petIds: [petsImagesRepository.itens[0].id],
    })

    expect(petsImagesRepository.itens).toHaveLength(0)
  })
})
