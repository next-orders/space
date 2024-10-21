import { channelUpdateSchema } from '~~/server/core/services/channel'

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
    const data = channelUpdateSchema.parse(body)

    await prisma.channel.update({
      where: { id: channelId },
      data: {
        name: data.name,
        description: data.description,
        phone: data.phone,
        currencyCode: data.currencyCode,
        countryCode: data.countryCode,
        timeZone: data.timeZone,
        minAmountForDelivery: data.minAmountForDelivery,
        conditions: data.conditions,
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
