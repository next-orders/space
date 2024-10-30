import { TZDate } from '@date-fns/tz'
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

      await sendToReceivers(checkout.id)

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

async function sendToReceivers(checkoutId: string) {
  const checkout = await prisma.checkout.findFirst({
    where: { id: checkoutId },
    include: {
      lines: {
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })
  if (!checkout?.id) {
    return
  }

  const channel = await prisma.channel.findFirst({
    where: { id: checkout?.channelId },
    include: {
      warehouses: true,
      paymentMethods: true,
    },
  })
  if (!channel?.id) {
    return
  }

  const paymentMethodName = channel?.paymentMethods.find((p) => p.id === checkout?.paymentMethodId)?.name as string
  const warehouseAddress = channel?.warehouses.find((w) => w.id === checkout?.warehouseId)?.address
  const address = checkout.street
    ? {
        street: checkout.street,
        flat: checkout.flat ?? undefined,
        doorphone: checkout.doorphone ?? undefined,
        entrance: checkout.entrance ?? undefined,
        floor: checkout.floor ?? undefined,
        addressNote: checkout.addressNote ?? undefined,
      }
    : undefined
  const time = new TZDate(checkout.time, channel.timeZone)

  const receivers = await prisma.checkoutReceiver.findMany({
    where: { channelId: checkout?.channelId },
  })

  for (const receiver of receivers as CheckoutReceiver[]) {
    if (receiver.type === 'EMAIL' && receiver.data.template === 'NEW_CHECKOUT') {
      const data: NewCheckoutTemplate = {
        id: checkout.id,
        deliveryMethod: checkout.deliveryMethod as Checkout['deliveryMethod'],
        time,
        timeType: checkout.timeType as Checkout['timeType'],
        paymentMethodName,
        change: checkout.change ?? undefined,
        name: checkout.name,
        phone: checkout.phone,
        note: checkout.note ?? undefined,
        totalPrice: checkout.totalPrice,
        warehouseAddress,
        address,
        lines: checkout.lines.map((line) => ({
          id: line.id,
          name: line.variant.product.name,
          variant: line.variant.name,
          quantity: line.quantity,
          totalPrice: line.totalPrice,
        })),
      }

      await sendEmail<NewCheckoutTemplate>(receiver, data)
    }
  }
}

async function sendEmail<T>(receiver: CheckoutReceiverTypeEmail, data: T) {
  const logger = useLogger('sendEmail')

  try {
    await $fetch(receiver.data.url, {
      method: receiver.data.method,
      body: {
        to: receiver.data.to,
        template: receiver.data.template,
        data,
      },
      headers: {
        Authorization: `Bearer ${receiver.data.token}`,
      },
    })

    return true
  } catch (error) {
    logger.error(error)

    return false
  }
}
