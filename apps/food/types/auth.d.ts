declare module '#auth-utils' {
  interface User {
    id: string
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
