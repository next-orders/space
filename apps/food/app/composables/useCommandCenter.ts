function _useCommandCenter() {
  const route = useRoute()

  const isModalOpened = ref(false)
  const searchQuery = ref('')

  watch(
    () => route.fullPath,
    () => {
      isModalOpened.value = false
      searchQuery.value = ''
    },
  )

  return {
    isModalOpened,
    searchQuery,
  }
}

export const useCommandCenter = createSharedComposable(_useCommandCenter)
