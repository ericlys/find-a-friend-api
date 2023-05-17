import { Prisma, Pet } from '@prisma/client'
import { PetsRepository, findManyByQueryParams } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByQuery({
    orgs,
    page,
    amount,
    age,
    energy,
    independence,
    size,
  }: findManyByQueryParams): Promise<Pet[]> {
    const orgs_ids = orgs.map((org) => org.id)

    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: orgs_ids,
        },
        ...(age && { age }),
        ...(energy && { energy_level: energy }),
        ...(independence && { independence_level: independence }),
        ...(size && { size }),
      },
      take: amount,
      skip: (page - 1) * amount,
    })

    return pets
  }
}
