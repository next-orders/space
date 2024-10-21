import { channelPaymentMethodUpdateSchema } from '~~/server/core/services/channel'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = channelPaymentMethodUpdateSchema.parse(body)

    await prisma.paymentMethod.update({
      where: { id },
      data: {
        name: data.name,
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
