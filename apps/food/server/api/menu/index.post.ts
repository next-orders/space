import { createId } from '@paralleldrive/cuid2'
import { menuCreateSchema } from '~~/server/core/services/menu'

export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()
    const body = await readBody(event)

    const data = menuCreateSchema.parse(body)
    const id = createId()

    const menu = await prisma.menu.create({
      data: {
        id,
        slug: id,
        name: data.name,
        channelId,
      },
    })

    return {
      ok: true,
      result: menu,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
