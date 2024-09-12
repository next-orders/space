function _useCommandCenter() {
  const route = useRoute()

  const isNavbarOpened = ref(false)
  const isModalOpened = ref(false)
  const searchQuery = ref('')

  watch(
    () => route.fullPath,
    () => {
      isNavbarOpened.value = false
      isModalOpened.value = false
      searchQuery.value = ''
    },
  )

  return {
    isNavbarOpened,
    isModalOpened,
    searchQuery,
  }
}

export const useCommandCenter = createSharedComposable(_useCommandCenter)
