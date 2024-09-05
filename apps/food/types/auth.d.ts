declare module '#auth-utils' {
  interface User {
    id: string
    checkoutId?: string
  }

  interface UserSession {
    user: User
  }
}

export {}
