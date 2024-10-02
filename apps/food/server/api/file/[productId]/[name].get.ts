export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'productId')
    const name = getRouterParam(event, 'name')
    if (!productId || !name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing name',
      })
    }

    const itemName = `${productId}/${name}`

    const file = await useStorage('fileSystem').hasItem(itemName)
    if (!file) {
      throw createError({
        statusCode: 404,
        statusMessage: 'File not found',
      })
    }

    setHeaders(event, {
      'Cache-Control': 'public, max-age=31536000, immutable',
    })

    return useStorage('fileSystem').getItemRaw(itemName)
  } catch (error) {
    throw errorResolver(error)
  }
})
