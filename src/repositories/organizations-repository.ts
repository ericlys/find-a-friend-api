import { Organization, Prisma } from '@prisma/client'

export interface FindManyByLocationParams {
  city: string
  state: string
}

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  findByLocation(
    params: FindManyByLocationParams,
  ): Promise<Organization[] | null>
}
