import { z } from 'zod'

export const productCreateSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(250).optional().default(''),
})
