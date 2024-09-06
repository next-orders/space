export default defineNuxtRouteMiddleware(async () => {
  const { user } = useUserSession()

  if (!user.value?.isStaff) {
    return navigateTo('/command-center/sign-in')
  }
})
