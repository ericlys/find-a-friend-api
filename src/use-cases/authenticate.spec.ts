import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { AuthenticateUseCase } from './authenticate'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationRepository.create({
      contact_name: 'PetShop1',
      email: 'petshop@example.com',
      postal_code: '12345-678',
      address: 'Endereço do PetShop',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: await hash('pass123', 6),
    })

    const { organization } = await sut.execute({
      email: 'petshop@example.com',
      password: 'pass123',
    })
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'petshop@example.com',
        password: 'pass123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationRepository.create({
      contact_name: 'PetShop1',
      email: 'petshop@example.com',
      postal_code: '12345-678',
      address: 'Endereço do PetShop',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: await hash('pass123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'petshop@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
