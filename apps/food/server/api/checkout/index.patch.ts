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
          variant: true,
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

  const receivers = await prisma.checkoutReceiver.findMany({
    where: { channelId: checkout?.channelId },
  })

  for (const receiver of receivers as CheckoutReceiver[]) {
    if (receiver.type === 'EMAIL') {
      const html = prepareEmailHtml(checkout as Checkout & { lines: (CheckoutLine & { variant: ProductVariant })[] }, channel as Channel & { warehouses: Warehouse[], paymentMethods: PaymentMethod[] })

      await sendEmail(receiver, html)
    }
  }
}

async function sendEmail(receiver: CheckoutReceiverTypeEmail, html: string) {
  const logger = useLogger('sendEmail')

  try {
    await $fetch(receiver.data.url, {
      method: receiver.data.method,
      body: {
        to: receiver.data.to,
        subject: receiver.data.subject,
        html,
      },
    })

    return true
  } catch (error) {
    logger.error(error)

    return false
  }
}

function prepareEmailHtml(checkout: Checkout & { lines: (CheckoutLine & { variant: ProductVariant })[] }, channel: Channel & { warehouses: Warehouse[], paymentMethods: PaymentMethod[] }) {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="utf-8">
    </head>

    <body>
      <h1>Новая заявка!</h1>
      <h2>${checkout?.deliveryMethod === 'WAREHOUSE' ? 'Самовывоз' : 'Доставка'}}</h2>
      <p>Клиент: ${checkout.name}, ${checkout.phone}</p>
      <p>Время: ${checkout.time}</p>

      ${checkout.warehouseId ? `<p>Адрес склада-кухни: ${channel.warehouses.find((w) => w.id === checkout.warehouseId)?.address}</p>` : ''}
      ${checkout.street ? `<p>Адрес: ${checkout.street} ${checkout.flat}, домофон ${checkout.doorphone}, подъезд ${checkout.entrance}, этаж ${checkout.floor}. ${checkout.addressNote}</p>` : ''}
      
      <p>Метод оплаты: ${channel.paymentMethods.find((p) => p.id === checkout.paymentMethodId)?.name}</p>
      ${checkout.change ? `<p>Нужна сдача с: ${checkout.change}</p>` : ''}

      <p>Комментарий: ${checkout.note}</p>

      <h3>Заказанные товары:</h3>
      ${checkout.lines
        .map((line) => {
          return `
            <p>${line.variant.name} - ${line.quantity} шт. - ${line.variant.gross}</p>
          `
        })
        .join('')}

      <p>Итого: ${checkout.totalPrice}</p>
    </body>
    </html>
  `
}
