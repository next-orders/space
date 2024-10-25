import { createTransport } from 'nodemailer'

export default eventHandler(async (event) => {
  try {
    const logger = useLogger('email')
    const { host, port, user, pass, from, token } = useRuntimeConfig(event)
    const key = getRouterParam(event, 'token')

    if (!token || token !== key) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      })
    }

    const body = await readBody(event)

    if (!body?.to || !body?.subject || !body?.html) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing data',
      })
    }

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
      subject: body.subject,
      text: body.html.replace(/<[^>]+>/g, ''),
      html: body.html,
    })
    logger.log('Response from SMTP server:', info?.accepted?.length > 0 ? 'SUCCESS' : 'FAILED', info?.response, info?.messageId)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
