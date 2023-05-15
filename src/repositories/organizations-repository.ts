import { Organizations, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationsCreateInput): Promise<Organizations>
}
