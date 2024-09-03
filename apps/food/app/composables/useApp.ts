function _useApp() {
  const route = useRoute()

  const isNavbarOpened = ref(false)

  watch(
    () => route.fullPath,
    () => {
      isNavbarOpened.value = false
    },
  )

  return {
    isNavbarOpened,
  }
}

export const useApp = createSharedComposable(_useApp)
