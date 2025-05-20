import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const connect = (connectionString: string) => {
  const sql = neon(connectionString)
  return drizzle({ client: sql })
}

export { connect }
