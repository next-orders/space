import { channelReceivingMethodUpdateSchema } from '~~/server/core/services/channel'

export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()
    if (!channelId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing channelId',
      })
    }

    const body = await readBody(event)
    const data = channelReceivingMethodUpdateSchema.parse(body)

    const channel = await prisma.channel.findFirst({
      where: { id: channelId },
    })

    if (data.method === 'DELIVERY') {
      await prisma.channel.update({
        where: { id: channelId },
        data: {
          isDeliveryAvailable: !channel?.isDeliveryAvailable,
        },
      })
    }

    if (data.method === 'PICKUP') {
      await prisma.channel.update({
        where: { id: channelId },
        data: {
          isPickupAvailable: !channel?.isPickupAvailable,
        },
      })
    }

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
