import { z } from 'zod'

export const productCreateSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(250).optional().default(''),
})

export const productVariantCreateSchema = z.object({
  productId: z.string(),
  name: z.string().min(2).max(50),
  weightValue: z.number(),
  weightUnit: z.enum(['G', 'KG', 'ML', 'L', 'LB', 'OZ']),
  gross: z.number().default(0),
  net: z.number().optional(),
  calories: z.number().optional(),
  protein: z.number().optional(),
  fat: z.number().optional(),
  carbohydrate: z.number().optional(),
})
