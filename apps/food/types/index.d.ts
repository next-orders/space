declare global {
  interface Channel {
    id: string
    createdAt: Date
    updatedAt: Date
    slug: string
    name: string
    description: string | null
    conditions: string | null
    phone: string | null
    currencyCode: CurrencyCode
    countryCode: CountryCode
    timeZone: TimeZone
    isActive: boolean
    isDeliveryAvailable: boolean
    isPickupAvailable: boolean
    minAmountForDelivery: number | null
  }

  type CurrencyCode = 'USD' | 'EUR' | 'RUB' | 'GEL' | 'BYN' | 'UAH' | 'KZT' | 'PLN' | 'TRY'

  type CountryCode = 'RU' | 'US' | 'GB' | 'GR' | 'GE' | 'UA' | 'BY' | 'KZ' | 'FR' | 'DE' | 'IT' | 'ES' | 'TR' | 'PL'

  type Locale = 'ru' | 'en' | 'ka'

  type TimeZone = '-12:00' | '-11:00' | '-10:00' | '-09:00' | '-08:00' | '-07:00' | '-06:00' | '-05:00' | '-04:00' | '-03:00' | '-02:00' | '-01:00' | '00:00' | '+01:00' | '+02:00' | '+03:00' | '+04:00' | '+05:00' | '+06:00' | '+07:00' | '+08:00' | '+09:00' | '+10:00' | '+11:00' | '+12:00'

  interface PaymentMethod {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    type: PaymentMethodType
  }

  type PaymentMethodType = 'CASH' | 'CARD' | 'CUSTOM'

  interface WorkingDay {
    id: string
    createdAt: Date
    updatedAt: Date
    day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
    openHours: number
    openMinutes: number
    closeHours: number
    closeMinutes: number
    isActive: boolean
    channelId: string
  }

  interface Media {
    id: string
    createdAt: Date
    updatedAt: Date
  }

  interface Menu {
    id: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
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

  type MenuCategoryIcon =
    | 'DEFAULT'
    | 'BURGER'
    | 'PIZZA'
    | 'ROLLS'
    | 'SUSHI'
    | 'WOK'
    | 'CAKE'
    | 'LASAGNA'
    | 'DRINK'

  interface Product {
    id: string
    createdAt: Date
    updatedAt: Date
    slug: string
    name: string
    description: string
    isAvailableForPurchase: boolean
    channelId: string
    categoryId: string
    mediaId: string | null
    variants: ProductVariant[]
  }

  interface ProductVariant {
    id: string
    createdAt: Date
    updatedAt: Date
    productId: string
    name: string
    weightUnit: WeightUnit
    weightValue: number
    gross: number
    net: number | null
    calories: number | null
    protein: number | null
    fat: number | null
    carbohydrate: number | null
    sku: string | null
  }

  type WeightUnit = 'G' | 'KG' | 'ML' | 'L' | 'OZ' | 'LB'

  interface Checkout {
    id: string
    createdAt: Date
    updatedAt: Date
    status: 'CREATED' | 'FINISHED' | 'CANCELED'
    name: string
    phone: string
    deliveryMethod: CheckoutDeliveryMethod
    paymentMethodId: string
    shippingPrice: number
    totalPrice: number
    discount: number | null
    note: string | null
    time: Date
    timeType: 'ASAP' | 'SCHEDULED'
    change: string | null
    warehouseId: string | null
    street: string
    flat: string | null
    doorphone: string | null
    entrance: string | null
    floor: string | null
    addressNote: string | null
    channelId: string
  }

  type CheckoutDeliveryMethod = 'DELIVERY' | 'WAREHOUSE'

  interface CheckoutDraft extends Pick<Checkout, 'name' | 'phone' | 'paymentMethodId' | 'note' | 'time' | 'timeType' | 'change' | 'warehouseId' | 'street' | 'flat' | 'doorphone' | 'entrance' | 'floor'> {
    time: Date | undefined
    note: string | undefined
    change: string | undefined
    warehouseId: string | undefined
    street: string | undefined
    flat: string | undefined
    doorphone: string | undefined
    entrance: string | undefined
    floor: string | undefined
    addressNote: string | undefined
  }

  interface CheckoutLine {
    id: string
    createdAt: Date
    updatedAt: Date
    checkoutId: string
    productVariantId: string
    quantity: number
    unitPrice: number
    undiscountedUnitPrice: number
    totalPrice: number
    undiscountedTotalPrice: number
    isGift: boolean
  }

  type CheckoutReceiver = {
    id: string
    createdAt: Date
    updatedAt: Date
    channelId: string
  } & CheckoutReceiverTypes

  type CheckoutReceiverTypes = CheckoutReceiverTypeEmail | CheckoutReceiverTypeHttp

  interface CheckoutReceiverTypeEmail {
    type: 'EMAIL'
    data: {
      url: string
      method: 'POST'
      token: string
      to: string
      template: 'NEW_CHECKOUT'
    }
  }

  interface CheckoutReceiverTypeHttp {
    type: 'HTTP'
    data: {
      url: string
      method: 'POST'
      token: string
    }
  }

  interface User {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string | null
    email: string | null
    isActive: boolean
    isConfirmed: boolean
    isStaff: boolean
    channelId: string
  }

  interface UserPermission {
    id: string
    createdAt: Date
    updatedAt: Date
    code: PermissionCode
    userId: string
  }

  type PermissionCode = 'MASTER' | 'MANAGE_OPTIONS' | 'MANAGE_MENUS' | 'MANAGE_PRODUCTS' | 'MANAGE_CHECKOUTS' | 'MANAGE_CLIENTS' | 'MANAGE_WAREHOUSES'

  interface UserCredentials {
    id: string
    createdAt: Date
    updatedAt: Date
    login: string
    passwordHash: string
    userId: string
  }

  interface Warehouse {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    address: string
    channelId: string
  }
}

export {}
