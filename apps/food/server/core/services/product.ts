import { z } from 'zod'

export const productCreateSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2).max(75),
  description: z.string().min(0).max(1000).optional().default(''),
})

export const productUpdateSchema = z.object({
  name: z.string().min(2).max(75).optional(),
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
  calories: z.coerce.number().optional().nullable(),
  protein: z.coerce.number().optional().nullable(),
  fat: z.coerce.number().optional().nullable(),
  carbohydrate: z.coerce.number().optional().nullable(),
  sku: z.string().max(50).optional().nullable(),
})

export const productVariantUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  weightValue: z.number().optional(),
  weightUnit: z.enum(['G', 'KG', 'ML', 'L', 'LB', 'OZ']).optional(),
  gross: z.number().optional(),
  net: z.number().optional(),
  calories: z.coerce.number().optional().nullable(),
  protein: z.coerce.number().optional().nullable(),
  fat: z.coerce.number().optional().nullable(),
  carbohydrate: z.coerce.number().optional().nullable(),
  sku: z.string().max(50).optional().nullable(),
})

const MAX_FILE_SIZE = 20000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const productImageUploadSchema = z.object({
  file: z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 20MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
})
