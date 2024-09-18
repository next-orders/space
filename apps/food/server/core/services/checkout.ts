export async function updateCheckout(id: string) {
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

  const shippingPrice = checkout.deliveryMethod === 'DELIVERY' ? 100 : 0
  const totalPrice = shippingPrice + checkout.lines.reduce((acc, line) => {
    return acc + line.quantity * line.variant.gross
  }, 0)

  return prisma.checkout.update({
    where: { id: checkout.id },
    data: {
      updatedAt: new Date(),
      totalPrice,
      shippingPrice,
    },
  })
}
