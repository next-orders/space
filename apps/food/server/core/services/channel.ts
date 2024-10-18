import { z } from 'zod'

export const channelUpdateSchema = z.object({
  name: z.string().min(2).max(75).optional(),
  description: z.string().min(0).max(150).nullable().optional(),
  phone: z.string().max(20).nullable().optional(),
  currencyCode: z.string().max(3).optional(),
  countryCode: z.string().max(3).optional(),
  timeZone: z.string().max(6).optional(),
  minAmountForDelivery: z.number().nullable().optional(),
  conditions: z.string().max(750).nullable().optional(),
})
