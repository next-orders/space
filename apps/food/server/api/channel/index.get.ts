import { TZDate } from '@date-fns/tz'

export default defineEventHandler(async () => {
  try {
    const { channelId } = useRuntimeConfig()
    if (!channelId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing channelId',
      })
    }

    const channel = await prisma.channel.findFirst({
      where: { id: channelId.toString() },
      include: {
        menus: {
          include: {
            categories: {
              include: {
                products: {
                  include: {
                    variants: true,
                    category: true,
                  },
                },
              },
            },
          },
        },
        warehouses: true,
        paymentMethods: true,
        workingDays: true,
      },
    })
    if (!channel) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Channel not found',
      })
    }

    // Working day
    const timeZone = channel.timeZone
    const dayOfWeekIndex = new TZDate(new Date(), timeZone).getDay()
    const dayOfWeek = getDayOfWeekByIndex(dayOfWeekIndex)
    const workingDay = channel.workingDays.find((day) => day.day === dayOfWeek)

    return {
      ...channel,
      workingDay,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
