import { workingDayActivityUpdateSchema } from '~~/server/core/services/workingDay'

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
    const data = workingDayActivityUpdateSchema.parse(body)

    const workingDay = await prisma.workingDay.findFirst({
      where: { day: data.day },
    })
    if (!workingDay) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Working day not found',
      })
    }

    await prisma.workingDay.update({
      where: { id: workingDay.id },
      data: {
        isActive: !workingDay.isActive,
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
