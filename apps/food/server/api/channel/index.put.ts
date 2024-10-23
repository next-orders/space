import { createId } from '@paralleldrive/cuid2'
import { channelCreateSchema } from '~~/server/core/services/channel'

export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()
    if (!channelId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing channelId',
      })
    }

    // Guard: If channel already exists
    const channel = await prisma.channel.findFirst({
      where: { id: channelId },
    })
    if (channel) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Channel already exists',
      })
    }

    const body = await readBody(event)
    const data = channelCreateSchema.parse(body)

    await prisma.channel.create({
      data: {
        id: channelId,
        slug: channelId,
        name: data.name,
        currencyCode: data.currencyCode,
        countryCode: data.countryCode,
        timeZone: data.timeZone,
      },
    })

    // Working days
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const
    for (const day of days) {
      await prisma.workingDay.create({
        data: {
          id: createId(),
          openHours: 0,
          openMinutes: 0,
          closeHours: 0,
          closeMinutes: 0,
          channelId,
          day,
        },
      })
    }

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
