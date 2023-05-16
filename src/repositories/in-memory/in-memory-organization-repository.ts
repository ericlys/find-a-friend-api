import { Prisma, Organization } from '@prisma/client'
import {
  FindManyByLocationParams,
  OrganizationsRepository,
} from '../organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: randomUUID(),
      contact_name: data.contact_name,
      email: data.email,
      mobile_number: data.mobile_number,
      password: data.password,
      street: data.street,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.email === email,
    )

    return organization ?? null
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.id === id,
    )

    return organization ?? null
  }

  async findByLocation({
    city,
    state,
  }: FindManyByLocationParams): Promise<Organization[] | null> {
    const organizations = this.items.filter(
      (organization) =>
        organization.city === city && organization.state === state,
    )

    return organizations ?? null
  }
}
