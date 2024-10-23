import { checkoutUpdateSchema, updateCheckout } from '~~/server/core/services/checkout'

export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()

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

    const channel = await prisma.channel.findFirst({
      where: { id: channelId },
    })

    await updateCheckout(checkout.id)

    const isFinished = data.phone && data.name

    // Guard: If checkout.totalPrice < minAmountForDelivery
    if (isFinished) {
      const actualCheckout = await prisma.checkout.findFirst({
        where: { id: checkout.id },
      })

      if (actualCheckout?.deliveryMethod === 'DELIVERY' && channel?.minAmountForDelivery) {
        if (actualCheckout.totalPrice < channel.minAmountForDelivery) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Minimum order value not reached',
          })
        }
      }
    }

    const updatedCheckout = await prisma.checkout.update({
      where: { id: checkout.id },
      data: {
        deliveryMethod: data.deliveryMethod,
        phone: data.phone,
        name: data.name,
        warehouseId: data.warehouseId,
        street: data.street,
        flat: data.flat,
        doorphone: data.doorphone,
        entrance: data.entrance,
        floor: data.floor,
        addressNote: data.addressNote,
        paymentMethodId: data.paymentMethodId,
        time,
        timeType: data.timeType,
        change: data.change,
        note: data.note,
      },
    })

    if (isFinished) {
      await prisma.checkout.update({
        where: { id: checkout.id },
        data: {
          status: 'FINISHED',
        },
      })

      const session = await getUserSession(event)
      await replaceUserSession(event, {
        ...session,
        checkout: null,
      })
    }

    return {
      ok: true,
      result: updatedCheckout,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
