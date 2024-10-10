export default defineEventHandler(async () => {
  const { channelId } = useRuntimeConfig()
  if (!channelId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing channelId',
    })
  }

  return prisma.channel.findFirst({
    where: { id: channelId.toString() },
    include: {
      menus: {
        include: {
          categories: {
            include: {
              products: {
                include: {
                  variants: true,
                },
              },
            },
          },
        },
      },
      warehouses: true,
      paymentMethods: true,
    },
  })
})
