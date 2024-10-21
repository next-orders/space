import { z } from 'zod'

export const workingDayActivityUpdateSchema = z.object({
  day: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']),
})

export const workingDaysUpdateSchema = z.record(z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']),
  z.object({
    open: z.string().time(),
    close: z.string().time(),
  }),
)
