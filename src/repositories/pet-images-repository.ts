import { PetImage, Prisma } from '@prisma/client'

export interface PetsImagesRepository {
  create(data: Prisma.PetImageUncheckedCreateInput): Promise<PetImage>
  delete(petImagesIds: string[]): Promise<void>
  findMany(imagesIds: string[]): Promise<PetImage[]>
}
