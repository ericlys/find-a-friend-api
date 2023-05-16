import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExists } from './erros/organization-already-exists-error'

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
      city: 'São Paulo',
      state: 'SP',
      street: 'rua do meio',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: 'pass123',
    })

    console.log(organization)

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      contact_name: 'PetShop1',
      email: 'petshop@example.com',
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'rua do meio',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: 'pass123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'pass123',
      organization.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'petshop.cats@example.com'

    await sut.execute({
      contact_name: 'PetShop1',
      email,
      postal_code: '12345-678',
      city: 'São Paulo',
      state: 'SP',
      street: 'rua do meio',
      latitude: -6.88625,
      longitude: -38.54824,
      mobile_number: '(99) 99999-9999',
      password: 'pass123',
    })

    await expect(() =>
      sut.execute({
        contact_name: 'PetShop2',
        email,
        postal_code: '12345-678',
        city: 'São Paulo',
        state: 'SP',
        street: 'rua do meio',
        latitude: -6.88625,
        longitude: -38.54824,
        mobile_number: '(99) 99999-9999',
        password: 'pass123',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExists)
  })
})
