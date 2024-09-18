import { createId } from '@paralleldrive/cuid2'
import { productCreateSchema } from '~~/server/core/services/product'

export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()
    const body = await readBody(event)

    const data = productCreateSchema.parse(body)
    const id = createId()

    const product = await prisma.product.create({
      data: {
        id,
        slug: id,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        channelId,
      },
    })

    return {
      ok: true,
      result: product,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
