import { createSchema, createYoga } from 'graphql-yoga'
import { connect } from '../db'
import { resolvers } from './schema/resolvers.generated'
import { typeDefs } from './schema/typeDefs.generated'

const schema = createSchema<{ env: Env }>({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
})
const yoga = createYoga<{ env: Env }>({
  maskedErrors: false,
  schema,
  context: ({ env }) => ({ db: connect(env.NEON_DATABASE_URL) }),
})

export { schema, yoga }
