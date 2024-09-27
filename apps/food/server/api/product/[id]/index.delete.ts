export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    // Delete all variants
    await prisma.productVariant.deleteMany({
      where: { productId: id },
    })

    const deleted = await prisma.product.delete({
      where: { id },
    })

    return {
      ok: true,
      result: deleted,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
