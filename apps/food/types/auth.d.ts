declare module '#auth-utils' {
  interface User {
    id: string
    isStaff: boolean
    permissions: PermissionCode[]
  }

  interface Checkout {
    id: string
  }

  interface UserSession {
    user: User
    checkout?: Checkout
  }
}

export {}
