export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const variant = await prisma.productVariant.delete({
      where: { id },
    })

    return {
      ok: true,
      result: variant,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
