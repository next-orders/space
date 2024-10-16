declare module '#auth-utils' {
  interface User {
    id: string
    isStaff: boolean
    name: string | null
    permissions: PermissionCode[]
  }

  interface Checkout {
    id: string
  }

  interface UserSession {
    user: User
    checkout?: Checkout | null
  }
}

export {}
