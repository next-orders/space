export async function sendEmail<T>(receiver: CheckoutReceiverTypeEmail, data: T) {
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

export async function sendHttp<T>(receiver: CheckoutReceiverTypeHttp, data: T) {
  const logger = useLogger('sendHttp')

  try {
    await $fetch(receiver.data.url, {
      method: receiver.data.method,
      body: {
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
