import { z } from 'astro:schema'

const createUserInput = z.object({
  password: z.string().min(3),
  terms: z.boolean().refine((value) => value === true, {
    message: 'Terms must be accepted',
  }),
  username: z.string().email(),
})
const getUserInput = z.object({
  id: z.string().optional(),
})

type CreateUserInputType = z.infer<typeof createUserInput>
type GetUserInputType = z.infer<typeof getUserInput>

export type { CreateUserInputType, GetUserInputType }
export { createUserInput, getUserInput }
