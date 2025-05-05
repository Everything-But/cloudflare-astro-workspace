import { eq } from 'drizzle-orm'
import { eventsTable } from '../../../../../db/schema'
import type { QueryResolvers } from './../../../types.generated'

export const event: NonNullable<QueryResolvers['event']> = async (_parent, _arg, _ctx) => {
  const { id } = _arg
  const { db } = _ctx
  const [result] = await db.select().from(eventsTable).where(eq(eventsTable.id, id))
  return result
}
