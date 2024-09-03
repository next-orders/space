async function _useChannel() {
  const route = useRoute()

  const { data: channel } = await useFetch('/api/channel')
  const activeMenu = computed(() => channel.value?.menus[0] || null)
  const activeCategories = computed(() => activeMenu.value?.categories || [])

  watch(
    () => route.fullPath,
    () => {
      // revalidate data
    },
  )

  return {
    channel,
    menus: computed(() => channel.value?.menus || []),
    menu: activeMenu,
    categories: activeCategories,
  }
}

export const useChannel = createSharedComposable(_useChannel)
