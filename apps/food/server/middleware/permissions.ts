export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const permissions = user?.permissions || []

  const routesWithRequiredPermissions = [
    {
      route: '/api/product',
      method: 'POST',
      permissions: ['MANAGE_PRODUCTS', 'MASTER'],
    },
    {
      route: '/api/product',
      method: 'PATCH',
      permissions: ['MANAGE_PRODUCTS', 'MASTER'],
    },
    {
      route: '/api/product',
      method: 'DELETE',
      permissions: ['MANAGE_PRODUCTS', 'MASTER'],
    },
    {
      route: '/api/product/variant',
      method: 'POST',
      permissions: ['MANAGE_PRODUCTS', 'MASTER'],
    },
    {
      route: '/api/product/variant',
      method: 'PATCH',
      permissions: ['MANAGE_PRODUCTS', 'MASTER'],
    },
    {
      route: '/api/product/variant',
      method: 'DELETE',
      permissions: ['MANAGE_PRODUCTS', 'MASTER'],
    },
    {
      route: '/api/menu',
      method: 'POST',
      permissions: ['MANAGE_MENUS', 'MASTER'],
    },
    {
      route: '/api/category',
      method: 'POST',
      permissions: ['MANAGE_MENUS', 'MASTER'],
    },
  ]

  for (const route of routesWithRequiredPermissions) {
    if (event.path.startsWith(route.route) && event.method === route.method) {
      if (!route.permissions.some((permission) => permissions.includes(permission as PermissionCode))) {
        throw errorResolver(createError({ statusCode: 403, statusMessage: 'Not allowed' }))
      }
    }
  }
})
