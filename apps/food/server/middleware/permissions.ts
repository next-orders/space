export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const permissions = user?.permissions || []

  // Create Product
  if (event.path === '/api/product' && event.method === 'POST') {
    const allowed = ['MANAGE_PRODUCTS', 'MASTER']

    if (!allowed.some((permission) => permissions.includes(permission as PermissionCode))) {
      throw errorResolver(createError({ statusCode: 403, statusMessage: 'Not allowed' }))
    }
  }

  // Create Menu
  if (event.path === '/api/menu' && event.method === 'POST') {
    const allowed = ['MANAGE_MENUS', 'MASTER']

    if (!allowed.some((permission) => permissions.includes(permission as PermissionCode))) {
      throw errorResolver(createError({ statusCode: 403, statusMessage: 'Not allowed' }))
    }
  }
})
