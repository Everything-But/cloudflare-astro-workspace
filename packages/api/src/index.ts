import { WorkerEntrypoint } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'
import { connect } from './db'
import { eventsTable, InsertEvent, InsertUser, SelectEvent, SelectUser, usersTable } from './db/schema'

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from 'hono'
import { yoga } from './graphql'

const app = new Hono()
app.all('/graphql', async (c) => {
  return yoga.fetch(c.req.raw, { env: c.env as Env })
})

const defaultEntry = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return app.fetch(request, env, ctx)
  },
} satisfies ExportedHandler<Env>

class EventEntrypoint extends WorkerEntrypoint {
  db
  constructor(context: ExecutionContext, env: Env) {
    super(context, env)
    this.db = connect(env.NEON_DATABASE_URL)
  }
  async createEvent({ data }: { data: InsertEvent }): Promise<SelectEvent> {
    const validatedData = {
      ...data,
      // createdBy: '',
    }
    const [result] = await this.db.insert(eventsTable).values(validatedData).returning()
    return result
  }
  async getEvent({ name }: { name: string | undefined }): Promise<SelectEvent[]> {
    if (!name) {
      const results = await this.db.select().from(eventsTable)
      return results
    }
    const result = await this.db.select().from(eventsTable).where(eq(eventsTable.name, name))
    return result
  }
}

class UserEntrypoint extends WorkerEntrypoint {
  db
  constructor(context: ExecutionContext, env: Env) {
    super(context, env)
    this.db = connect(env.NEON_DATABASE_URL)
  }
  async createUser({ data }: { data: InsertUser }): Promise<SelectUser> {
    const [result] = await this.db.insert(usersTable).values(data).returning()
    return result
  }
  async getUser({ id }: { id: string | undefined }): Promise<SelectUser[]> {
    if (!id) {
      const results = await this.db.select().from(usersTable)
      return results
    }
    const result = await this.db.select().from(usersTable).where(eq(usersTable.id, id))
    return result
  }
}

export { EventEntrypoint, UserEntrypoint, defaultEntry as default }
