import { z } from 'astro:schema'

const createEventInput = z
  .object({
    endTime: z.coerce.date(),
    // imageUrl: z.,
    // location: z.,
    name: z.string().min(1, 'Value is too short'),
    slug: z.string(),
    startTime: z.coerce.date(),
    timezone: z.enum(['UTC-12', ...Array.from({ length: 24 }, (_, i) => (i < 11 ? `UTC${i - 11}` : i > 11 ? `UTC+${i - 11}` : 'UTC'))]),
  })
  .superRefine((value, context) => {
    if (value.startTime > value.endTime) {
      context.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['startTime'],
        message: 'Start time must be after End time',
      })
    }
    if (value.endTime < value.startTime) {
      context.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['endTime'],
        message: 'End time must be after Start time',
      })
    }
  })
const getEventInput = z.object({
  name: z.string().optional(),
})

type CreateEventInputType = z.infer<typeof createEventInput>
type GetEventInputType = z.infer<typeof getEventInput>
type EventType = {
  id: string
  createdAt: string
  createdBy: string
  endTime: string
  name: string
  slug: string
  startTime: string
  timezone: string
  updatedAt: string
}

export type { CreateEventInputType, EventType, GetEventInputType }
export { createEventInput, getEventInput }
