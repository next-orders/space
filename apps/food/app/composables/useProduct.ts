export async function useProduct() {
  const { data, refresh } = await useFetch('/api/channel/product', {
    key: 'products',
  })

  return { products: data, refresh }
}
