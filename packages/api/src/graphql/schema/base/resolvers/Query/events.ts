import { eq } from 'drizzle-orm'
import { eventsTable } from '../../../../../db/schema'
import type { QueryResolvers } from './../../../types.generated'

export const events: NonNullable<QueryResolvers['events']> = async (_parent, _arg, _ctx) => {
  const { name } = _arg?.filter ?? {}
  const { db } = _ctx
  if (!name) {
    const results = await db.select().from(eventsTable)
    return results
  }
  const result = await db.select().from(eventsTable).where(eq(eventsTable.name, name))
  return result
}
