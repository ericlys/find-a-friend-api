import { randomUUID } from 'crypto'
import { PetsImagesRepository } from '../pet-images-repository'
import { Prisma, PetImage } from '@prisma/client'

export class InMemorePetImagesRepository implements PetsImagesRepository {
  public itens: PetImage[] = []

  async create({
    path,
    pet_id,
  }: Prisma.PetImageUncheckedCreateInput): Promise<PetImage> {
    const petImage = {
      id: randomUUID(),
      path,
      pet_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.itens.push(petImage)

    return petImage
  }

  async delete(petImagesIds: string[]): Promise<void> {
    const newListOfImages = this.itens.filter(
      (image) => !petImagesIds.includes(image.id),
    )

    this.itens = newListOfImages
  }

  async findMany(imagesIds: string[]): Promise<PetImage[]> {
    const images = this.itens.filter((image) => imagesIds.includes(image.id))

    return images
  }
}
