export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const checkout = await prisma.checkout.findFirst({
      where: { id },
      include: {
        lines: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
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
