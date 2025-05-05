import { usersTable } from '../../../../../db/schema'
import type { MutationResolvers } from './../../../types.generated'

export const createUser: NonNullable<MutationResolvers['createUser']> = async (_parent, _arg, _ctx) => {
  try {
    const { password, username } = _arg?.record ?? {}
    const { db } = _ctx
    const [result] = await db.insert(usersTable).values({ password, username }).returning()
    return result
  } catch (error) {
    console.error('createEvent')
    console.error(error)
    throw error
  }
}
