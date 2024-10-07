export async function useProduct() {
  const key = 'products'
  const nuxtApp = useNuxtApp()

  const { data, refresh } = await useFetch('/api/channel/product', {
    key,
    getCachedData() {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  })

  return { products: data, refresh }
}
