export default defineEventHandler(async () => {
  const { channelId } = useRuntimeConfig()
  if (!channelId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing channelId',
    })
  }

  await prisma.channel.findFirst({
    where: { id: channelId },
  })

  return {
    ok: true,
  }
})
