import { createId } from '@paralleldrive/cuid2'

export default defineEventHandler(async (event) => {
  const logger = useLogger('api:auth:session')

  try {
    const user = {
      id: createId(),
    }
    await setUserSession(event, { user })

    return { ok: true }
  } catch (e) {
    logger.error(e)
    throw createError({ statusCode: 401 })
  }
})
