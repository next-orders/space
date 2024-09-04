export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return prisma.product.findFirst({
    where: { id },
    include: {
      variants: true,
    },
  })
})
