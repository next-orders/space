import { productUpdateSchema } from '~~/server/core/services/product'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = productUpdateSchema.parse(body)

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
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
