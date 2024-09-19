import { createId } from '@paralleldrive/cuid2'
import { menuCategoryCreateSchema } from '~~/server/core/services/menu'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const data = menuCategoryCreateSchema.parse(body)
    const id = createId()

    const category = await prisma.menuCategory.create({
      data: {
        id,
        slug: id,
        name: data.name,
        menuId: data.menuId,
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
