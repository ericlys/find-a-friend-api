import { Prisma, Pet } from '@prisma/client'
import { PetsRepository, findManyByQueryParams } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      energy_level: data.energy_level,
      size: data.size,
      independence_level: data.independence_level,
      environment_type: data.environment_type,
      created_at: new Date(),
      updated_at: new Date(),
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }

  async findManyByQuery({
    orgs,
    age,
    energy,
    independence,
    size,
  }: findManyByQueryParams): Promise<Pet[]> {
    const orgsIds = orgs.map((org) => org.id)

    const pets = this.items.filter((pet) => {
      return (
        orgsIds.includes(pet.organization_id) &&
        (!age || pet.age === age) &&
        (!energy || pet.energy_level === energy) &&
        (!independence || pet.independence_level === independence) &&
        (!size || pet.size === size)
      )
    })

    return pets
  }
}
