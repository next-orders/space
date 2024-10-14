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

    await prisma.checkout.update({
      where: { id: checkout.id },
      data: {
        deliveryMethod: data.deliveryMethod,
        phone: data.phone,
        name: data.name,
        warehouseId: data.warehouseId,
        addressId: data.addressId,
        paymentMethodId: data.paymentMethodId,
        change: data.change,
        note: data.note,
      },
    })

    await updateCheckout(checkout.id)

    return {
      ok: true,
      result: checkout,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
