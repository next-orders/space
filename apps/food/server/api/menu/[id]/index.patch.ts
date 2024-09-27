import { menuUpdateSchema } from '~~/server/core/services/menu'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = menuUpdateSchema.parse(body)

    const menu = await prisma.menu.update({
      where: { id },
      data: {
        name: data.name,
        isActive: data.isActive,
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
