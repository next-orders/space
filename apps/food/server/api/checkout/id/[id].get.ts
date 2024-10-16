export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const checkoutInDB = await prisma.checkout.findFirst({
      where: { id },
      include: {
        lines: true,
      },
    })
    if (!checkoutInDB?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No checkout',
      })
    }

    return checkoutInDB
  } catch (error) {
    throw errorResolver(error)
  }
})
