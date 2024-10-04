export async function useProduct() {
  const nuxtApp = useNuxtApp()

  const { data, refresh } = await useFetch('/api/channel/product', {
    key: 'products',
    watch: false,
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  })

  return { products: data, refresh }
}
