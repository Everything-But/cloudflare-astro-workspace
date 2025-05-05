import { eventsTable } from '../../../../../db/schema'
import type { MutationResolvers } from './../../../types.generated'

export const createEvent: NonNullable<MutationResolvers['createEvent']> = async (_parent, _arg, _ctx) => {
  try {
    const { endTime, name, slug, startTime, timezone } = _arg?.record ?? {}
    const data = {
      name,
      slug,
      timezone,
      ...(endTime && { endTime: new Date(endTime) }),
      ...(startTime && { startTime: new Date(startTime) }),
    }
    const { db } = _ctx
    const [result] = await db
      .insert(eventsTable)
      .values({ ...data })
      .returning()
    return result
  } catch (error) {
    console.error('createEvent')
    console.error(error)
    throw error
  }
}
