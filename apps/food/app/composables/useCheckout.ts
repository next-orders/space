function _useCheckout() {
  const { data, refresh } = useFetch('/api/checkout', {
    server: false,
    watch: false,
  })

  const isEmpty = computed(() => !data.value || data.value?.lines?.length === 0)

  const addProduct = async (productVariantId: string) => {
    await $fetch(
      '/api/checkout/add',
      {
        method: 'POST',
        body: { productVariantId },
      },
    )

    await refresh()
  }

  const update = async (checkout: Partial<Checkout>) => {
    await $fetch(
      '/api/checkout',
      {
        method: 'PATCH',
        body: { checkout },
      },
    )

    await refresh()
  }

  const changeLineQuantity = async (id: string, method: 'increment' | 'decrement') => {
    await $fetch(
      `/api/checkout/line/${id}`,
      {
        method: 'POST',
        body: { method },
      },
    )

    await refresh()
  }

  return { checkout: data, isEmpty, addProduct, update, changeLineQuantity }
}

export const useCheckout = createSharedComposable(_useCheckout)
