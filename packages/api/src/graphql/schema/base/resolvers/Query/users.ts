import { eq } from 'drizzle-orm'
import { usersTable } from '../../../../../db/schema'
import type { QueryResolvers } from './../../../types.generated'

export const users: NonNullable<QueryResolvers['users']> = async (_parent, _arg, _ctx) => {
  const { id } = _arg?.filter ?? {}
  const { db } = _ctx
  if (!id) {
    const result = await db.select().from(usersTable)
    return result
  }
  const result = await db.select().from(usersTable).where(eq(usersTable.id, id))
  return result
}
