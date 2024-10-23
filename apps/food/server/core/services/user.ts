import { z } from 'zod'

export const userCreateSchema = z.object({
  login: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  name: z.string().min(2).max(50).optional(),
})
