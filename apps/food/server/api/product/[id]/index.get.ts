export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const product = await prisma.product.findFirst({
      where: { id },
      include: {
        variants: true,
      },
    })
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found',
      })
    }

    return product
  } catch (error) {
    throw errorResolver(error)
  }
})
