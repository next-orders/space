import { render } from '@vue-email/render'
import { createTransport } from 'nodemailer'
import NewCheckout from '~/core/email/templates/NewCheckout.vue'

export default eventHandler(async (event) => {
  try {
    const logger = useLogger('email')
    const { host, port, user, pass, from, token } = useRuntimeConfig(event)

    const bearer = getHeader(event, 'Authorization')
    const key = bearer?.replace('Bearer ', '')

    if (!token || !key || token !== key) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      })
    }

    const body = await readBody(event)

    if (!body?.to || !body?.template || !body?.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing data',
      })
    }

    const subject = body.template === 'NEW_CHECKOUT' ? 'Новая заявка!' : 'Новое сообщение'
    const html = await render(NewCheckout, body.data, { pretty: true })
    const text = await render(NewCheckout, body.data, { plainText: true })

    const transporter = createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      tls: {
        rejectUnauthorized: false,
      },
      auth: { user, pass },
    })

    const info = await transporter.sendMail({
      from,
      to: body.to,
      subject,
      text,
      html,
    })
    logger.log('Response from SMTP server:', info?.accepted?.length > 0 ? 'SUCCESS' : 'FAILED', info?.response, info?.messageId)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
