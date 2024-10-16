export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const checkout = await prisma.checkout.findFirst({
      where: { id },
      include: {
        lines: true,
      },
    })
    if (!checkout?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No checkout',
      })
    }

    return checkout
  } catch (error) {
    throw errorResolver(error)
  }
})
