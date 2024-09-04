export async function useCheckout() {
  const { data } = await useFetch('/api/checkout')
  return data
}
