import { Prisma, Organization } from '@prisma/client'
import {
  FindManyByLocationParams,
  OrganizationsRepository,
} from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationRespository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByLocation({
    city,
    state,
  }: FindManyByLocationParams): Promise<Organization[] | null> {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
        state,
      },
    })

    return organizations
  }
}
