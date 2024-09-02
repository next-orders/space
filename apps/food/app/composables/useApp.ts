function _useApp() {
  const route = useRoute()

  const isMobileMenuOpened = ref(false)

  watch(
    () => route.fullPath,
    () => {
      isMobileMenuOpened.value = false
    },
  )

  return {
    isMobileMenuOpened,
  }
}

export const useApp = createSharedComposable(_useApp)
