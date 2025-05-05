import { neon } from '@neondatabase/serverless'
import { buildSchema } from 'drizzle-graphql'
import { drizzle } from 'drizzle-orm/neon-http'
import { GraphQLSchema } from 'graphql'
import { createYoga } from 'graphql-yoga'
import * as dbSchema from './schema'

const connect = (connectionString: string) => {
  const sql = neon(connectionString)
  return drizzle({ client: sql })
}

const connectGql = async (connectionString: string) => {
  const sql = neon(connectionString)
  const db = drizzle({ client: sql, schema: dbSchema })
  const { entities } = buildSchema(db)
  const schema = new GraphQLSchema({})
  const yoga = createYoga({ schema })
}

export { connect, connectGql }
