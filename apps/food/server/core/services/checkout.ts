import { z } from 'zod'

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

export const checkoutUpdateSchema = z.object({
  deliveryMethod: z.enum(['WAREHOUSE', 'DELIVERY']).optional(),
  phone: z.string().max(20).optional(),
  name: z.string().max(50).optional(),
  warehouseId: z.string().max(50).optional(),
  street: z.string().min(2).max(80).optional(),
  flat: z.string().max(10).optional(),
  doorphone: z.string().max(10).optional(),
  entrance: z.string().max(10).optional(),
  floor: z.string().max(10).optional(),
  addressNote: z.string().max(250).optional(),
  paymentMethodId: z.string().max(50).optional(),
  time: z.string().optional(),
  timeType: z.enum(['ASAP', 'SCHEDULED']).optional(),
  change: z.string().max(10).optional(),
  note: z.string().max(250).optional(),
})
