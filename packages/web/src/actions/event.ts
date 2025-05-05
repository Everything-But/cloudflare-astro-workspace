import {
  // ActionError,
  defineAction,
} from 'astro:actions'
// import { graphql } from '../graphql'
// import { execute } from '../graphql/execute'
import { createEventInput, getEventInput } from '../types/event'

// const eventsQuery = graphql(`
//   query events($name: String) {
//     events(filter: { name: $name }) {
//       id
//       createdAt
//       createdBy
//       endTime
//       name
//       startTime
//       slug
//       timezone
//       updatedAt
//     }
//   }
// `)
// const createEventMutation = graphql(`
//   mutation createEvent($endTime: String!, $name: String!, $slug: String!, $startTime: String!, $timezone: String!) {
//     createEvent(record: { endTime: $endTime, name: $name, slug: $slug, startTime: $startTime, timezone: $timezone }) {
//       id
//       createdAt
//       createdBy
//       endTime
//       name
//       startTime
//       slug
//       timezone
//       updatedAt
//     }
//   }
// `)

const event = {
  createEvent: defineAction({
    input: createEventInput,
    handler: async (input, context) => {
      const { endTime, name, slug, startTime, timezone } = input
      try {
        const createdEvent = await context.locals.runtime.env.EVENT.createEvent({ data: { endTime, name, slug, startTime, timezone } })
        return createdEvent
      } catch (error) {
        console.error('createEvent')
        console.error(error)
        throw error
      }
    },
  }),
  // createEventGql: defineAction({
  //   input: createEventInput,
  //   handler: async (input, context) => {
  //     const { endTime, name, slug, startTime, timezone } = input
  //     try {
  //       const data = await execute(createEventMutation, {
  //         endTime: `${endTime}`,
  //         name,
  //         slug,
  //         startTime: `${startTime}`,
  //         timezone,
  //       })
  //       const { errors } = data as { errors: any }
  //       if (errors) {
  //         const [error] = errors
  //         const { extensions, message } = error
  //         const { code } = extensions
  //         throw new ActionError({ code, message })
  //       }
  //       return data
  //     } catch (error) {
  //       console.error('createEventGql')
  //       console.error(error)
  //       throw error
  //     }
  //   },
  // }),
  getEvent: defineAction({
    input: getEventInput,
    handler: async (input, context) => {
      const { name } = input
      try {
        const events = await context.locals.runtime.env.EVENT.getEvent({ name })
        return events
      } catch (error) {
        console.error('getEvent')
        console.error(error)
        throw error
      }
    },
  }),
  // getEventGql: defineAction({
  //   input: getEventInput,
  //   handler: async (input, context) => {
  //     const { name } = input
  //     try {
  //       const { data, error } = (await execute(eventsQuery, { name })) as { data: any; error: any }
  //       if (error) {
  //         throw error
  //       }
  //       const { events } = data
  //       return events
  //     } catch (error) {
  //       console.error('getEventGql')
  //       console.error(error)
  //       throw error
  //     }
  //   },
  // }),
}

export { event }
