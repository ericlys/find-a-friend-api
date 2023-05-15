import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { AnimalSize, EnvironmentType, IndependenceLevel } from '@prisma/client'

let petsRepository: InMemoryPetRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Fido',
      description: 'Um adorável cachorro da raça Shih-tzu',
      age: 3,
      energyLevel: 3,
      size: AnimalSize.SMALL,
      independenceLevel: IndependenceLevel.LOW,
      environmentType: EnvironmentType.INDOOR,
      organizationId: '123456789',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
