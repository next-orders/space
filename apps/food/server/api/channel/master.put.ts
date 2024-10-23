import { createId } from '@paralleldrive/cuid2'
import { userCreateSchema } from '~~/server/core/services/user'
import { hash } from 'bcrypt'

export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()
    if (!channelId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing channelId',
      })
    }

    // Guard: If user already exists
    const userExist = await prisma.user.findFirst({
      where: { channelId: channelId.toString() },
    })
    if (userExist) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User already exists',
      })
    }

    const body = await readBody(event)
    const data = userCreateSchema.parse(body)

    const user = await prisma.user.create({
      data: {
        id: createId(),
        channelId,
        isStaff: true,
        name: data.name,
      },
    })

    const passwordHash = await hash(data.password, 10)

    await prisma.userCredentials.create({
      data: {
        id: createId(),
        login: data.login,
        passwordHash,
        userId: user.id,
      },
    })

    await prisma.userPermission.create({
      data: {
        id: createId(),
        code: 'MASTER',
        userId: user.id,
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
