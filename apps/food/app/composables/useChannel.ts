export async function useChannel() {
  const { data, refresh } = await useFetch('/api/channel', {
    key: 'channel',
  })

  const menus = computed(() => data.value?.menus || [])
  const activeMenu = computed(() => menus.value[0] || null)
  const categories = computed(() => activeMenu.value?.categories || [])

  return { channel: data, menus, activeMenu, categories, refresh }
}
