import { createId } from '@paralleldrive/cuid2'
import { updateCheckout } from '~~/server/core/services/checkout'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.productVariantId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing data',
    })
  }

  // Check if checkout exists
  let checkoutId = ''

  const { checkout } = await getUserSession(event)
  if (!checkout) {
    // Create new checkout
    const staticCheckoutId = 'mktjetoq700msdhiihujo2bz'

    // Update user session
    await setUserSession(event, {
      checkout: {
        id: staticCheckoutId,
      },
    })

    checkoutId = staticCheckoutId
  } else {
    checkoutId = checkout.id
  }

  const checkoutInDB = await prisma.checkout.findFirst({
    where: {
      id: checkoutId,
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

  // Add +1 or create new line
  const line = checkoutInDB?.lines.find((line) => line.productVariantId === body.productVariantId)
  if (!line) {
    // Limit
    if (checkoutInDB?.lines?.length >= 20) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Limit reached',
      })
    }

    // Create new line
    await prisma.checkoutLine.create({
      data: {
        id: createId(),
        checkoutId,
        productVariantId: body.productVariantId,
        quantity: 1,
      },
    })
  } else {
    // Add +1
    await prisma.checkoutLine.update({
      where: { id: line.id },
      data: { quantity: line.quantity + 1 },
    })
  }

  await updateCheckout(checkoutId)

  return {
    ok: true,
  }
})
