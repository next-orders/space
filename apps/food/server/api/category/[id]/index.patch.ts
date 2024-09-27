import { menuCategoryUpdateSchema } from '~~/server/core/services/menu'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = menuCategoryUpdateSchema.parse(body)

    const category = await prisma.menuCategory.update({
      where: { id },
      data: {
        name: data.name,
      },
    })

    return {
      ok: true,
      result: category,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
