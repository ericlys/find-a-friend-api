import { prisma } from '@/lib/prisma'
import { PetsImagesRepository } from '../pet-images-repository'
import { Prisma, PetImage } from '@prisma/client'

export class PrismaPetImagesRepository implements PetsImagesRepository {
  async create({
    path,
    pet_id,
  }: Prisma.PetImageUncheckedCreateInput): Promise<PetImage> {
    const pet = await prisma.petImage.create({
      data: {
        path,
        pet_id,
      },
    })

    return pet
  }

  async delete(petImagesIds: string[]): Promise<void> {
    await prisma.petImage.deleteMany({
      where: {
        id: {
          in: petImagesIds,
        },
      },
    })
  }

  async findMany(imagesIds: string[]): Promise<PetImage[]> {
    const images = await prisma.petImage.findMany({
      where: {
        id: {
          in: imagesIds,
        },
      },
      include: {
        pet: {
          select: {
            organization_id: true,
          },
        },
      },
    })

    return images
  }
}
