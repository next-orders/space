import { createId } from '@paralleldrive/cuid2'

export default defineEventHandler(async (event) => {
  const { channelId } = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.name || !body.categoryId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing data',
    })
  }

  const id = createId()

  const product = await prisma.product.create({
    data: {
      id,
      slug: id,
      name: body.name,
      description: body.description,
      categoryId: body.categoryId,
      channelId,
    },
  })

  return {
    ok: true,
    result: product,
  }
})
