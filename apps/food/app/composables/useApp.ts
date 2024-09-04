function _useApp() {
  const route = useRoute()

  const isNavbarOpened = ref(false)
  const isCartDrawerOpened = ref(false)

  watch(
    () => route.fullPath,
    () => {
      isNavbarOpened.value = false
      isCartDrawerOpened.value = false
    },
  )

  return {
    isNavbarOpened,
    isCartDrawerOpened,
  }
}

export const useApp = createSharedComposable(_useApp)
