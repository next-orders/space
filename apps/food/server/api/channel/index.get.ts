import { TZDate } from '@date-fns/tz'
import { getDayIndexByDay } from '~~/server/utils/date'

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

    // Master
    const master = await prisma.user.findFirst({
      where: { channelId, isStaff: true },
      orderBy: { createdAt: 'desc' },
      include: {
        permissions: true,
      },
    })
    const masterAccountExists = !!master?.permissions.find((permission) => permission.code === 'MASTER')

    // Working day
    const timeZone = channel.timeZone
    const dayOfWeekIndex = new TZDate(new Date(), timeZone).getDay()
    const dayOfWeek = getDayOfWeekByIndex(dayOfWeekIndex)
    const workingDay = channel.workingDays.find((day) => day.day === dayOfWeek)

    // Working days
    const workingDays = channel.workingDays.sort((a, b) => getDayIndexByDay(a.day as WorkingDay['day']) - getDayIndexByDay(b.day as WorkingDay['day']))
    // Sunday on end
    workingDays.push(workingDays.shift()!)

    return {
      ...channel,
      workingDay,
      workingDays,
      masterAccountExists,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
