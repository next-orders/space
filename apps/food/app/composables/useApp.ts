function _useApp() {
  const route = useRoute()

  const isNavbarOpened = ref(false)
  const isCartDrawerOpened = ref(false)
  const isDeliveryInfoModalOpened = ref(false)

  watch(
    () => route.fullPath,
    () => {
      isNavbarOpened.value = false
      isCartDrawerOpened.value = false
      isDeliveryInfoModalOpened.value = false
    },
  )

  return {
    isNavbarOpened,
    isCartDrawerOpened,
    isDeliveryInfoModalOpened,
  }
}

export const useApp = createSharedComposable(_useApp)
