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
          body: checkout,
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

  const createAddress = async (address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { result } = await $fetch(
        '/api/address',
        {
          method: 'POST',
          body: address,
        },
      )

      return result.id
    } catch (error) {
      console.error(error)
    }
  }

  const getAddress = async (id: string) => {
    try {
      const result = await $fetch(`/api/address/${id}`)
      return result
    } catch (error) {
      console.error(error)
    }
  }

  return { checkout: data, isEmpty, addProduct, update, changeLineQuantity, getAddress, createAddress }
}

export const useCheckout = createSharedComposable(_useCheckout)
