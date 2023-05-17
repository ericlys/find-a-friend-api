import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const organizationId = request.user.sub

  const refreshToken = await prisma.refreshToken.findFirst({
    where: {
      id: request.cookies.refreshToken,
    },
  })

  if (!refreshToken) {
    return reply.status(404).send({ message: 'Refresh token not found.' })
  }

  const refreshTokenExpired = dayjs().isAfter(
    dayjs.unix(refreshToken.expires_in),
  )

  if (refreshTokenExpired) {
    return reply.status(401).send({ message: 'Refresh token expired.' })
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organizationId,
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken.id, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
