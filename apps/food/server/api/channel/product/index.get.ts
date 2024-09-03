export default defineEventHandler(async () => {
  const { channelId } = useRuntimeConfig()
  if (!channelId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing channelId',
    })
  }

  return prisma.product.findMany({
    where: { channelId: channelId.toString() },
    include: { variants: true },
  })
})
