export async function useCheckout() {
  const { data, refresh } = await useFetch('/api/checkout', {
    key: 'checkout',
  })

  const isCheckoutEmpty = computed(() => !data.value || data.value?.lines?.length === 0)

  const addToCheckout = async (productVariantId: string) => {
    await useFetch(
      '/api/checkout',
      {
        method: 'POST',
        body: {
          productVariantId,
        },
      },
    )

    refresh()
  }

  return { checkout: data, isCheckoutEmpty, addToCheckout, refresh }
}
