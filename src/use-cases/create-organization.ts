import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrganizationUseCaseRequest {
  contact_name: string
  email: string
  postal_code: string
  address: string
  latitude: number
  longitude: number
  mobile_number: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    contact_name,
    email,
    postal_code,
    address,
    latitude,
    longitude,
    mobile_number,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      contact_name,
      email,
      postal_code,
      address,
      latitude,
      longitude,
      mobile_number,
      password: password_hash,
    })

    return { organization }
  }
}
