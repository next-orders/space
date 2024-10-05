export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const user = await prisma.user.findFirst({
      where: { id },
    })
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    return user
  } catch (error) {
    throw errorResolver(error)
  }
})
