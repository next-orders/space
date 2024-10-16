export async function useCheckoutList() {
  const key = 'checkouts'
  const nuxtApp = useNuxtApp()

  const { data, refresh } = await useFetch('/api/checkout/list', {
    key,
    getCachedData() {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  })

  return { checkouts: data, refresh }
}
