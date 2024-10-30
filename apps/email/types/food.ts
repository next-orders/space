export interface NewCheckoutTemplate {
  id: string
  deliveryMethod: 'WAREHOUSE' | 'DELIVERY'
  time: Date
  timeType: 'ASAP' | 'SCHEDULED'
  paymentMethodName: string
  change?: string
  name: string
  phone: string
  note?: string
  totalPrice: number
  lines: {
    id: string
    name: string
    variant: string
    quantity: number
    totalPrice: number
  }[]
  warehouseAddress?: string
  address?: {
    street: string
    flat?: string
    doorphone?: string
    entrance?: string
    floor?: string
    addressNote?: string
  }
}
