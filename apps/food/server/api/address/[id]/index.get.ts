export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const address = await prisma.address.findFirst({
      where: { id },
    })
    if (!address?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Address not found',
      })
    }

    return address
  } catch (error) {
    throw errorResolver(error)
  }
})
