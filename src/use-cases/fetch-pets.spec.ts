import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FetchPetsUseCase } from './fetch-pets'

let organizationRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new FetchPetsUseCase(petRepository, organizationRepository)
  })

  it('should be able to fetch pets by city and state', async () => {
    const org1 = await organizationRepository.create({
      contact_name: 'PetShop1',
      email: 'petshop1@example.com',
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua Principal',
      latitude: -23.5489,
      longitude: -46.6388,
      mobile_number: '(11) 11111-1111',
      password: await hash('password1', 6),
    })

    const org2 = await organizationRepository.create({
      contact_name: 'PetShop2',
      email: 'petshop2@example.com',
      postal_code: '12345-781',
      city: 'São Paulo',
      state: 'SP',
      street: 'Avenida Central',
      latitude: -23.5505,
      longitude: -46.6332,
      mobile_number: '(11) 22222-2222',
      password: await hash('password2', 6),
    })

    await petRepository.create({
      name: 'Fido',
      description: 'Um adorável cachorro da raça Shih-tzu',
      age: 0,
      energy_level: 3,
      size: 'SMALL',
      independence_level: 'LOW',
      environment_type: 'INDOOR',
      organization_id: org1.id,
    })

    await petRepository.create({
      name: 'Luna',
      description: 'Uma gata preta muito brincalhona',
      age: 2,
      energy_level: 4,
      size: 'SMALL',
      independence_level: 'MEDIUM',
      environment_type: 'INDOOR',
      organization_id: org2.id,
    })

    await petRepository.create({
      name: 'Max',
      description: 'Um cão leal da raça Labrador Retriever',
      age: 5,
      energy_level: 5,
      size: 'LARGE',
      independence_level: 'HIGH',
      environment_type: 'OUTDOOR',
      organization_id: org2.id,
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      state: 'SP',
    })

    expect(pets).lengthOf(3)
  })

  it('should be able filter pets in an location', async () => {
    const org1 = await organizationRepository.create({
      contact_name: 'PetShop1',
      email: 'petshop1@example.com',
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua Principal',
      latitude: -23.5489,
      longitude: -46.6388,
      mobile_number: '(11) 11111-1111',
      password: await hash('password1', 6),
    })

    const org2 = await organizationRepository.create({
      contact_name: 'PetShop2',
      email: 'petshop2@example.com',
      postal_code: '12345-781',
      city: 'São Paulo',
      state: 'SP',
      street: 'Avenida Central',
      latitude: -23.5505,
      longitude: -46.6332,
      mobile_number: '(11) 22222-2222',
      password: await hash('password2', 6),
    })

    await petRepository.create({
      name: 'Fido',
      description: 'Um adorável cachorro da raça Shih-tzu',
      age: 0,
      energy_level: 3,
      size: 'SMALL',
      independence_level: 'LOW',
      environment_type: 'INDOOR',
      organization_id: org1.id,
    })

    await petRepository.create({
      name: 'Luna',
      description: 'Uma gata preta muito brincalhona',
      age: 2,
      energy_level: 4,
      size: 'SMALL',
      independence_level: 'MEDIUM',
      environment_type: 'INDOOR',
      organization_id: org2.id,
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      state: 'SP',
      age: 0,
      energy: 3,
      size: 'SMALL',
      independence: 'LOW',
    })

    expect(pets).lengthOf(1)
  })
})
