import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorePetImagesRepository } from '@/repositories/in-memory/in-memory-pet-images-repository'
import { FindPetImagesUseCase } from './find-pet-images'

let petsImagesRepository: InMemorePetImagesRepository
let sut: FindPetImagesUseCase

describe('Find Pet Images Use Case', () => {
  beforeEach(() => {
    petsImagesRepository = new InMemorePetImagesRepository()
    sut = new FindPetImagesUseCase(petsImagesRepository)
  })

  it('should be able to find pet images', async () => {
    const { id } = await petsImagesRepository.create({
      path: '144sdd345234fa323_pet_path.jpg',
      pet_id: 'pet_id',
    })
    const { id: id2 } = await petsImagesRepository.create({
      path: '3452345234faw23_pet2_path.jpg',
      pet_id: 'pet_id',
    })
    const { id: id3 } = await petsImagesRepository.create({
      path: 'asdf345323_pet3_path.jpg',
      pet_id: 'pet_id',
    })

    const { petImages } = await sut.execute({
      imagesIds: [id, id2, id3],
    })

    expect(petImages).toHaveLength(3)
  })
})
