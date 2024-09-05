export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { checkout } = await getUserSession(event)
  if (!checkout) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No checkout',
    })
  }

  const updatedCheckout = body.checkout
  const deliveryMethod = updatedCheckout?.deliveryMethod

  await prisma.checkout.update({
    where: { id: checkout.id },
    data: {
      deliveryMethod,
    },
  })

  await updateCheckout(checkout.id)

  return {
    ok: true,
  }
})
