import { DiskStorage } from '@/providers/DiskStorage'
import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error'
import { makeCreatePetImagesUseCase } from '@/use-cases/factories/make-create-pet-images-use-case'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { PetImage } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function addImages(request: FastifyRequest, reply: FastifyReply) {
  const req = request as FastifyRequest & { files: any[] }

  const fileSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z.number(),
  })

  const addImagesBodySchema = z.object({
    pet_id: z.string(),
  })
  const addImagesFilesSchema = z.array(fileSchema).min(1, 'images is empty')

  const { pet_id } = addImagesBodySchema.parse(req.body)
  const files = addImagesFilesSchema.parse(req.files)

  const petDetailsUseCase = makeGetPetDetailsUseCase()
  const createPetImagesUseCase = makeCreatePetImagesUseCase()
  const diskStorage = new DiskStorage()

  try {
    const { pet } = await petDetailsUseCase.execute(pet_id)

    if (pet.organization_id !== req.user.sub) {
      files.forEach(async (imageFile) => {
        await diskStorage.deleteFile(imageFile.path)
      })
      return reply.status(404).send({
        message: 'Only the organization itself can manage this pet`s images.',
      })
    }

    const petImages: PetImage[] = []

    for (const image of files) {
      const filename = await diskStorage.saveFile(image.filename)
      const { petImage } = await createPetImagesUseCase.execute({
        path: filename,
        pet_id,
      })

      petImages.push(petImage)
    }

    return reply.status(201).send({ petImages })
  } catch (err) {
    files.forEach(async (imageFile) => {
      await diskStorage.deleteFile(imageFile.path)
    })

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
