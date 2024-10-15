import { checkoutUpdateSchema, updateCheckout } from '~~/server/core/services/checkout'

export default defineEventHandler(async (event) => {
  try {
    const { checkout } = await getUserSession(event)
    if (!checkout) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No checkout',
      })
    }

    const body = await readBody(event)
    const data = checkoutUpdateSchema.parse(body)
    const time = data.time ? new Date(data.time) : new Date()

    const isFinished = data.phone && data.name

    await prisma.checkout.update({
      where: { id: checkout.id },
      data: {
        deliveryMethod: data.deliveryMethod,
        phone: data.phone,
        name: data.name,
        warehouseId: data.warehouseId,
        addressId: data.addressId,
        paymentMethodId: data.paymentMethodId,
        time,
        timeType: data.timeType,
        change: data.change,
        note: data.note,
      },
    })

    await updateCheckout(checkout.id)

    if (isFinished) {
      await prisma.checkout.update({
        where: { id: checkout.id },
        data: {
          status: 'FINISHED',
        },
      })
    }

    return {
      ok: true,
      result: checkout,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
