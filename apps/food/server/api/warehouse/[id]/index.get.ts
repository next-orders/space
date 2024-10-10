export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const warehouse = await prisma.warehouse.findFirst({
      where: { id },
    })
    if (!warehouse?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Warehouse not found',
      })
    }

    return warehouse
  } catch (error) {
    throw errorResolver(error)
  }
})
