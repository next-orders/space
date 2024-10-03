export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const isActiveNow = await prisma.menu.findFirst({
      where: { id },
      select: { isActive: true },
    })
    if (!isActiveNow) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Menu not found',
      })
    }

    // Off all other menus
    await prisma.menu.updateMany({
      where: { id: { not: id } },
      data: {
        isActive: false,
      },
    })

    await prisma.menu.update({
      where: { id },
      data: {
        isActive: !isActiveNow.isActive,
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
