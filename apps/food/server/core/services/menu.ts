import { z } from 'zod'

export const menuCreateSchema = z.object({
  name: z.string().min(2).max(50),
})

export const menuCategoryCreateSchema = z.object({
  name: z.string().min(2).max(50),
  menuId: z.string(),
})
