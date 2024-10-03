import { compare } from 'bcrypt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body?.login || !body?.password) {
      throw createError({ statusCode: 400, statusMessage: 'Missing login or password' })
    }

    const { user: userInSession } = await getUserSession(event)
    if (userInSession?.isStaff) {
      return sendRedirect(event, '/command-center')
    }

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
      include: {
        permissions: true,
      },
    })
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'No user found' })
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        isStaff: user.isStaff,
        name: user.name,
        permissions: user.permissions.map((permission) => permission.code) as PermissionCode[],
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
