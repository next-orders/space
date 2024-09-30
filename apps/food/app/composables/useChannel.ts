export async function useChannel() {
  const { data, refresh } = await useFetch('/api/channel', {
    key: 'channel',
  })

  const menus = computed(() => data.value?.menus || [])
  const activeMenu = computed(() => menus.value?.find((menu) => menu.isActive) || null)
  const categories = computed(() => activeMenu.value?.categories || [])
  const categoriesWithProducts = computed(() => {
    return categories.value.filter((category) => category.products?.length > 0)
  })

  return { channel: data, menus, activeMenu, categories, categoriesWithProducts, refresh }
}
