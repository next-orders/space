import { z } from 'zod'

export const productCreateSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(1000).optional().default(''),
})

export const productUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  description: z.string().min(0).max(1000).optional(),
  slug: z.string().min(2).max(50).optional(),
  isAvailableForPurchase: z.boolean().optional(),
})

export const productVariantCreateSchema = z.object({
  productId: z.string(),
  name: z.string().min(2).max(50),
  weightValue: z.number(),
  weightUnit: z.enum(['G', 'KG', 'ML', 'L', 'LB', 'OZ']),
  gross: z.number(),
  net: z.number().optional(),
  calories: z.number().optional(),
  protein: z.number().optional(),
  fat: z.number().optional(),
  carbohydrate: z.number().optional(),
})

export const productVariantUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  weightValue: z.number().optional(),
  weightUnit: z.enum(['G', 'KG', 'ML', 'L', 'LB', 'OZ']).optional(),
  gross: z.number().optional(),
  net: z.number().optional(),
  calories: z.number().optional(),
  protein: z.number().optional(),
  fat: z.number().optional(),
  carbohydrate: z.number().optional(),
})
