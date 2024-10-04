export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()
    if (!channelId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing channelId',
      })
    }

    const { checkout } = await getUserSession(event)
    if (!checkout?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No checkout',
      })
    }

    return prisma.checkout.findFirst({
      where: { id: checkout.id },
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
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })
  } catch (error) {
    throw errorResolver(error)
  }
})
