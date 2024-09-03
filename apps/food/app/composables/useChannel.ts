export async function useChannel() {
  const { data } = await useAsyncData('channel', async () => {
    const [channel, products] = await Promise.all([
      $fetch('/api/channel'),
      $fetch('/api/channel/product'),
    ])

    const menus = channel?.menus || []
    const activeMenu = menus[0] || null
    const categories = activeMenu?.categories || []

    return { channel, menus, activeMenu, categories, products }
  })

  return data
}
