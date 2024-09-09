function _useCommandCenter() {
  const route = useRoute()

  const isNavbarOpened = ref(false)
  const searchQuery = ref('')

  watch(
    () => route.fullPath,
    () => {
      isNavbarOpened.value = false
      searchQuery.value = ''
    },
  )

  return {
    isNavbarOpened,
    searchQuery,
  }
}

export const useCommandCenter = createSharedComposable(_useCommandCenter)
