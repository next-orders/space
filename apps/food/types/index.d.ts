declare global {
  interface Channel {
    id: string
    createdAt: Date
    updatedAt: Date
    slug: string
    name: string
  }

  interface Menu {
    id: string
    createdAt: Date
    updatedAt: Date
    slug: string
    name: string
    channelId: string
    categories: MenuCategory[]
  }

  interface MenuCategory {
    id: string
    createdAt: Date
    updatedAt: Date
    slug: string
    name: string
    menuId: string
  }

  interface Product {
    id: string
    createdAt: Date
    updatedAt: Date
    slug: string
    name: string
  }
}

export {}
