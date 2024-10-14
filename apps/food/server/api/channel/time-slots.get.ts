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

    const timeZone = '+03:00'
    const openHours = 10
    const openMinutes = 30
    const closeHours = 22
    const closeMinutes = 30

    const timeOpen = new TZDate(new Date(), timeZone)
    timeOpen.setHours(openHours)
    timeOpen.setMinutes(openMinutes)
    const timeClose = new TZDate(new Date(), timeZone)
    timeClose.setHours(closeHours)
    timeClose.setMinutes(closeMinutes)

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
          value: time,
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
