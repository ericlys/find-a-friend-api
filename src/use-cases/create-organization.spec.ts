import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'

let organizationsRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create organization', async () => {
    const { organization } = await sut.execute({
      contact_name: 'PetShop1',
      email: 'petshop@example.com',
      postal_code: '12345-678',
      address: 'Endereço do PetShop',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: 'pass123',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})
