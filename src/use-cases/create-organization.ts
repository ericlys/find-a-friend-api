import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organizations } from '@prisma/client'

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
  organization: Organizations
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
    const organization = await this.organizationRepository.create({
      contact_name,
      email,
      postal_code,
      address,
      latitude,
      longitude,
      mobile_number,
      password,
    })

    return { organization }
  }
}
