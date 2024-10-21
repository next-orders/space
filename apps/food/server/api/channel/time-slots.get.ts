import { TZDate } from '@date-fns/tz'
import { getDayOfWeekByIndex } from '~~/server/utils/date'

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
      where: { id: channelId },
    })
    if (!channel) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Channel not found',
      })
    }

    const timeZone = channel.timeZone
    const dayOfWeekIndex = new TZDate(new Date(), timeZone).getDay()
    const dayOfWeek = getDayOfWeekByIndex(dayOfWeekIndex)

    const workingDay = await prisma.workingDay.findFirst({
      where: { channelId, day: dayOfWeek },
    })
    if (!workingDay || !workingDay.isActive) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not working today',
      })
    }

    const timeOpen = new TZDate(new Date(), timeZone)
    timeOpen.setHours(workingDay.openHours)
    timeOpen.setMinutes(workingDay.openMinutes)
    const timeClose = new TZDate(new Date(), timeZone)
    timeClose.setHours(workingDay.closeHours)
    timeClose.setMinutes(workingDay.closeMinutes)

    // Guard: if timeClose is 00:XX -> set it no next day
    if (workingDay.closeHours === 0) {
      timeClose.setDate(timeClose.getDate() + 1)
    }

    const slots = []

    // Prepare time slots every 15 min from now to closing time in format: 10:00 - 10:30
    for (let i = 0; i < 24 * 4; i++) {
      const time = new TZDate(new Date(), timeZone)
      time.setMinutes(15 * i)

      const timeNext = new TZDate(time, timeZone)
      timeNext.setMinutes(timeNext.getMinutes() + 30)

      const isItOpened = time >= timeOpen && time <= timeClose

      if (isItOpened) {
        slots.push({
          id: time.getTime().toString(),
          label: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')} - ${timeNext.getHours()}:${timeNext.getMinutes().toString().padStart(2, '0')}`,
          value: time.getTime(),
        })
      }
    }

    // Remove first slots and last slots
    slots.shift()
    slots.shift()
    slots.shift()
    slots.pop()
    slots.pop()

    return slots
  } catch (error) {
    throw errorResolver(error)
  }
})
