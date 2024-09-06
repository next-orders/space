export default defineEventHandler(async (event) => {
  const { channelId } = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  const product = await prisma.product.findFirst({
    where: { slug, channelId },
    include: {
      variants: true,
      category: true,
    },
  })
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
    })
  }

  return product
})
