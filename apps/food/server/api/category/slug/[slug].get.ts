export default defineEventHandler(async (event) => {
  const { channelId } = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  const activeMenu = await prisma.menu.findFirst({
    where: { channelId },
    include: {
      categories: {
        where: { slug },
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
    },
  })
  if (!activeMenu) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No menu',
    })
  }

  if (!activeMenu.categories[0]) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
    })
  }

  return activeMenu.categories[0]
})
