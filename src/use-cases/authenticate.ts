import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Omit<Organization, 'password'>
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, organization.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const { password: removeField, ...rest } = organization

    return {
      organization: { ...rest },
    }
  }
}
