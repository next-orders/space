export default defineNuxtRouteMiddleware(async () => {
  const { user, clear } = useUserSession()

  if (!user.value?.id || !user.value.isStaff) {
    return navigateTo('/command-center/sign-in')
  }

  // Check if staff has actual information
  const { error } = await useFetch(`/api/user/${user.value?.id}`)
  if (error.value?.message) {
    await clear()

    return navigateTo('/command-center/sign-in')
  }
})
