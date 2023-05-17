import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let petRepository: InMemoryPetRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new GetPetDetailsUseCase(petRepository)
  })

  it('should be able to get pet details', async () => {
    const { id } = await petRepository.create({
      name: 'Fido',
      description: 'Um adorável cachorro da raça Shih-tzu',
      age: 0,
      energy_level: 3,
      size: 'SMALL',
      independence_level: 'LOW',
      environment_type: 'INDOOR',
      organization_id: 'org123',
    })

    const response = await sut.execute(id)

    expect(response.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Fido',
        description: 'Um adorável cachorro da raça Shih-tzu',
        age: 0,
        energy_level: 3,
        size: 'SMALL',
        independence_level: 'LOW',
        environment_type: 'INDOOR',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        organization_id: 'org123',
      }),
    )
  })

  it('should not be able to get inexistent pet', async () => {
    await expect(() => sut.execute('fake_pet_id')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
