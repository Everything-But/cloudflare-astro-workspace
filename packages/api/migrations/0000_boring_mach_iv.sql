CREATE TYPE "public"."role" AS ENUM('admin', 'photographer');--> statement-breakpoint
CREATE TYPE "public"."timezone" AS ENUM('UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5', 'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4', 'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12');--> statement-breakpoint
CREATE TABLE "events_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid,
	"end_time" timestamp NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"start_time" timestamp NOT NULL,
	"timezone" timezone NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_table_slug_unique" UNIQUE("slug"),
	CONSTRAINT "start_time_check1" CHECK ("events_table"."start_time" <= "events_table"."end_time"),
	CONSTRAINT "end_time_check1" CHECK ("events_table"."end_time" >= "events_table"."start_time")
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'photographer',
	"username" text NOT NULL,
	CONSTRAINT "users_table_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "events_table" ADD CONSTRAINT "events_table_created_by_users_table_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "slug_idx" ON "events_table" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "start_time_idx" ON "events_table" USING btree ("start_time");