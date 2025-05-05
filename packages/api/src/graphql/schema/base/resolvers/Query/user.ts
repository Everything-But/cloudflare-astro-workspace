import { eq } from 'drizzle-orm'
import { usersTable } from '../../../../../db/schema'
import type { QueryResolvers } from './../../../types.generated'

export const user: NonNullable<QueryResolvers['user']> = async (_parent, _arg, _ctx) => {
  const { id } = _arg
  const { db } = _ctx
  const [result] = await db.select().from(usersTable).where(eq(usersTable.id, id))
  return result
}
