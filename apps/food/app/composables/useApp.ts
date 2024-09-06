function _useApp() {
  const route = useRoute()

  const isNavbarOpened = ref(false)
  const isCartDrawerOpened = ref(false)
  const isDeliveryInfoModalOpened = ref(false)
  const searchQuery = ref('')

  watch(
    () => route.fullPath,
    () => {
      isNavbarOpened.value = false
      isCartDrawerOpened.value = false
      isDeliveryInfoModalOpened.value = false
      searchQuery.value = ''
    },
  )

  return {
    isNavbarOpened,
    isCartDrawerOpened,
    isDeliveryInfoModalOpened,
    searchQuery,
  }
}

export const useApp = createSharedComposable(_useApp)
