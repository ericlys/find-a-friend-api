import { DiskStorage } from '@/providers/DiskStorage'
import { makeDeletePetImagesUseCase } from '@/use-cases/factories/make-delete-pet-images-use-case'
import { makeFindPetImagesUseCase } from '@/use-cases/factories/make-find-pet-images-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function removeImages(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const removeImagesBodySchema = z.object({
    imgIds: z.array(z.string()).min(1),
  })

  const { imgIds } = removeImagesBodySchema.parse(request.body)

  const findPetImagesUseCase = makeFindPetImagesUseCase()
  const deletePetImagesUseCase = makeDeletePetImagesUseCase()
  const diskStorage = new DiskStorage()

  const { petImages } = await findPetImagesUseCase.execute({
    imagesIds: imgIds,
  })

  await deletePetImagesUseCase.execute({ petIds: imgIds })
  for (const images of petImages) {
    await diskStorage.deleteFile(images.path)
  }

  return reply.status(201).send()
}
