export default defineEventHandler(async (event) => {
  const { channelId } = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  return prisma.product.findFirst({
    where: { slug, channelId },
    include: {
      variants: true,
      category: true,
    },
  })
})
