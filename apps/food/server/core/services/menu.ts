import { z } from 'zod'

export const menuCreateSchema = z.object({
  name: z.string().min(2).max(50),
})
