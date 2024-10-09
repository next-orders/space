import { updateCheckout } from '~~/server/core/services/checkout'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body.method) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing data',
    })
  }

  const method = body.method === 'increment' ? 'increment' : 'decrement'

  const { checkout } = await getUserSession(event)
  if (!checkout) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No checkout',
    })
  }

  const checkoutInDB = await prisma.checkout.findFirst({
    where: {
      id: checkout.id,
    },
    include: {
      lines: true,
    },
  })
  if (!checkoutInDB?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No checkout',
    })
  }

  const line = checkoutInDB?.lines.find((line) => line.id === id)
  if (!line) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No line',
    })
  }

  if (method === 'increment') {
    // Limit
    if (line.quantity >= 99) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Limit reached',
      })
    }

    await prisma.checkoutLine.update({
      where: { id },
      data: {
        quantity: line.quantity + 1,
      },
    })
  } else if (method === 'decrement') {
    await prisma.checkoutLine.update({
      where: { id },
      data: {
        quantity: line.quantity - 1,
      },
    })

    // If decremented to 0, remove line
    if (line.quantity - 1 <= 0) {
      await prisma.checkoutLine.delete({
        where: { id },
      })
    }
  }

  await updateCheckout(checkoutInDB.id)
})
