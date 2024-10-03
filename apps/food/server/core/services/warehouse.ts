import { z } from 'zod'

export const warehouseCreateSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(0).max(50),
})

export const warehouseUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  address: z.string().min(0).max(50).optional(),
})
