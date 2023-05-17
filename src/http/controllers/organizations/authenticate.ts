import { prisma } from '@/lib/prisma'
import { InvalidCredentialsError } from '@/use-cases/erros/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sub: organization.id,
    })

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: '7d',
        },
      },
    )

    const oldRefreshToken = await prisma.refreshToken.findFirst({
      where: {
        organization_id: organization.id,
      },
    })

    if (oldRefreshToken?.id) {
      await prisma.refreshToken.delete({
        where: {
          id: oldRefreshToken.id,
        },
      })
    }

    await prisma.refreshToken.create({
      data: {
        id: refreshToken,
        expires_in: dayjs().add(7, 'd').unix(),
        organization_id: organization.id,
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
