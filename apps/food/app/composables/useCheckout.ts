function _useCheckout() {
  const { data, refresh } = useFetch('/api/checkout', {
    server: false,
    watch: false,
  })

  const isEmpty = computed(() => !data.value || data.value?.lines?.length === 0)

  const addProduct = async (productVariantId: string) => {
    try {
      await $fetch(
        '/api/checkout/add',
        {
          method: 'POST',
          body: { productVariantId },
        },
      )

      await refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const update = async (checkout: Partial<Checkout>) => {
    try {
      await $fetch(
        '/api/checkout',
        {
          method: 'PATCH',
          body: { checkout },
        },
      )

      await refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const changeLineQuantity = async (id: string, method: 'increment' | 'decrement') => {
    try {
      await $fetch(
        `/api/checkout/line/${id}`,
        {
          method: 'POST',
          body: { method },
        },
      )

      await refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return { checkout: data, isEmpty, addProduct, update, changeLineQuantity }
}

export const useCheckout = createSharedComposable(_useCheckout)
