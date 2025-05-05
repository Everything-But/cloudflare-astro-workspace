import { relations, sql } from 'drizzle-orm'
import { check, index, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const rolesEnum = pgEnum('role', ['admin', 'photographer'])
const timezonesEnum = pgEnum('timezone', [
  'UTC-12',
  ...Array.from({ length: 24 }, (_, i) => (i < 11 ? `UTC${i - 11}` : i > 11 ? `UTC+${i - 11}` : 'UTC')),
])

const eventsTable = pgTable(
  'events_table',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: uuid('created_by').references(() => usersTable.id),
    endTime: timestamp('end_time').notNull(),
    // imageUrl: text('image_url').notNull(),
    // location: text('location'),
    name: text('name').unique().notNull(),
    slug: text('slug').unique(),
    startTime: timestamp('start_time').notNull(),
    timezone: timezonesEnum().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    check('start_time_check1', sql`${table.startTime} <= ${table.endTime}`),
    check('end_time_check1', sql`${table.endTime} >= ${table.startTime}`),
    index('slug_idx').on(table.slug),
    index('start_time_idx').on(table.startTime),
  ]
)

const usersTable = pgTable('users_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  password: text('password').notNull(),
  role: rolesEnum().default('photographer'),
  username: text('username').notNull().unique(),
})

// const postsTable = pgTable('posts_table', {
//   id: uuid('id').primaryKey(),
//   content: text('content').notNull(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   title: text('title').notNull(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
// })

const eventsRelations = relations(usersTable, ({ one }) => ({ createdByUser: one(usersTable) }))

type InsertEvent = typeof eventsTable.$inferInsert
// type InsertPost = typeof postsTable.$inferInsert
type InsertUser = typeof usersTable.$inferInsert
type SelectEvent = typeof eventsTable.$inferSelect
// type SelectPost = typeof postsTable.$inferSelect
type SelectUser = typeof usersTable.$inferSelect

export type {
  InsertEvent,
  // InsertPost,
  InsertUser,
  SelectEvent,
  // SelectPost,
  SelectUser,
}
export {
  eventsTable,
  // postsTable,
  usersTable,
  //
  eventsRelations,
  //
  rolesEnum,
  timezonesEnum,
}
