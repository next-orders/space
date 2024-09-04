import { createId } from '@paralleldrive/cuid2'

export default defineEventHandler(async (event) => {
  const { public: { checkoutCookieName } } = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.productVariantId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing data',
    })
  }

  // Check if checkout exists
  let checkoutId = getCookie(event, checkoutCookieName)

  if (!checkoutId) {
    // Create new checkout
    checkoutId = 'mktjetoq700msdhiihujo2bz'

    setCookie(event, checkoutCookieName, checkoutId, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    })
  }

  const checkout = await prisma.checkout.findFirst({
    where: {
      id: checkoutId,
    },
    include: {
      lines: true,
    },
  })

  // Add +1 or create new line
  const line = checkout?.lines.find((line) => line.productVariantId === body.productVariantId)
  if (!line) {
    // Limit
    if (checkout?.lines && checkout.lines.length >= 20) {
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

  // Update checkout
  await updateCheckout(checkoutId)

  return {
    ok: true,
  }
})

async function updateCheckout(id: string) {
  const checkout = await prisma.checkout.findFirst({
    where: { id },
    include: {
      lines: {
        include: {
          variant: true,
        },
      },
    },
  })

  if (!checkout) {
    return
  }

  const totalPrice = checkout.lines.reduce((acc, line) => {
    return acc + line.quantity * line.variant.gross
  }, 0)

  return prisma.checkout.update({
    where: { id: checkout.id },
    data: {
      updatedAt: new Date(),
      totalPrice,
    },
  })
}
