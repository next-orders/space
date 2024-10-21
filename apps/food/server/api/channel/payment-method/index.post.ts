import { createId } from '@paralleldrive/cuid2'
import { channelPaymentMethodCreateSchema } from '~~/server/core/services/channel'

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
    const data = channelPaymentMethodCreateSchema.parse(body)

    await prisma.paymentMethod.create({
      data: {
        id: createId(),
        name: data.name,
        type: data.type,
        channelId,
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
