function _useTime() {
  const { data: slots } = useFetch('/api/channel/time-slots', {
    server: false,
    watch: false,
  })

  return { slots }
}

export const useTime = createSharedComposable(_useTime)
