import { compare } from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.login || !body?.password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing login or password' })
  }

  const logger = useLogger('api:auth:sign-in')

  const { user } = await getUserSession(event)
  if (user?.isStaff) {
    return sendRedirect(event, '/command-center')
  }

  try {
    const credentials = await prisma.userCredentials.findFirst({
      where: { login: body.login },
    })
    if (!credentials) {
      throw createError({ statusCode: 401, statusMessage: 'Wrong login or password' })
    }

    const isMatch = await compare(body.password, credentials.passwordHash)
    if (!isMatch) {
      throw createError({ statusCode: 401, statusMessage: 'Wrong login or password' })
    }

    const user = await prisma.user.findFirst({
      where: { id: credentials.userId },
    })
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Wrong login or password' })
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        isStaff: user.isStaff,
      },
    })

    return { ok: true }
  } catch (e) {
    logger.error(e)
    throw createError({ statusCode: 401 })
  }
})
