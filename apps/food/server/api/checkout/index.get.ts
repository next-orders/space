export default defineEventHandler(async (event) => {
  const { public: { checkoutCookieName }, channelId } = useRuntimeConfig()
  if (!channelId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing channelId',
    })
  }

  const checkoutId = getCookie(event, checkoutCookieName)
  if (!checkoutId) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No checkout',
    })
  }

  return prisma.checkout.findFirst({
    where: { id: checkoutId },
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
})
