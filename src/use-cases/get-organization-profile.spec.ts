import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { GetOrganizationProfileUseCase } from './get-organization-profile'

let organizationsRepository: InMemoryOrganizationRepository
let sut: GetOrganizationProfileUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new GetOrganizationProfileUseCase(organizationsRepository)
  })

  it('should be able to get organization profile', async () => {
    const createdOrganization = await organizationsRepository.create({
      contact_name: 'PetShop1',
      email: 'petshop@example.com',
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'rua do meio',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: await hash('12345', 6),
    })

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    })

    expect(organization.contact_name).toEqual('PetShop1')
  })

  it('should not be able get organization profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        organizationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
