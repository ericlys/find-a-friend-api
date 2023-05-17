import {
  AnimalSize,
  IndependenceLevel,
  Organization,
  Pet,
  Prisma,
} from '@prisma/client'

export interface findManyByQueryParams {
  orgs: Organization[]
  page: number
  amount: number
  age?: number
  energy?: number
  size?: AnimalSize
  independence?: IndependenceLevel
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByQuery(params: findManyByQueryParams): Promise<Pet[]>
}
