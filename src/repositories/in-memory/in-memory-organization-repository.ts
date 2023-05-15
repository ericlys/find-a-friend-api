import { Prisma, Organizations } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organizations[] = []

  async create(data: Prisma.OrganizationsCreateInput): Promise<Organizations> {
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
}
