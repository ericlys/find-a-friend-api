import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: randomUUID(),
      contact_name: data.contact_name,
      email: data.email,
      postal_code: data.postal_code,
      address: data.address,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      mobile_number: data.mobile_number,
      password: data.password,
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
}
