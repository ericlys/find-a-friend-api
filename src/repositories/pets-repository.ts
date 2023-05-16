import { Organization, Pet, Prisma } from '@prisma/client'

export interface findManyByQueryParams {
  orgs: Organization[]
  age?: number
  energy?: number
  size?: string
  independence?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: String): Promise<Pet | null>
  findManyByQuery(params: findManyByQueryParams): Promise<Pet[]>
}
