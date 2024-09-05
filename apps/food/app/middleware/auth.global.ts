export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    // Create a new session
    await useFetch('/api/auth/session', { method: 'POST' })
  }
})
