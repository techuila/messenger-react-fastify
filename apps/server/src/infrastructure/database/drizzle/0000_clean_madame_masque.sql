CREATE TABLE IF NOT EXISTS "attachment" (
	"id" serial NOT NULL,
	"hash" text NOT NULL,
	"name" varchar NOT NULL,
	"size" varchar NOT NULL,
	"type" varchar NOT NULL,
	"path" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "channel" (
	"id" serial NOT NULL,
	"hash" text NOT NULL,
	"name" varchar NOT NULL,
	"photo_url" varchar,
	"is_direct_message" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_mention" (
	"id" serial NOT NULL,
	"hash" text NOT NULL,
	"chat_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat" (
	"id" serial NOT NULL,
	"hash" text NOT NULL,
	"attachment_id" text,
	"user_channel_id" text NOT NULL,
	"user_id" text NOT NULL,
	"reply_to_chat_id" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_channel" (
	"id" serial NOT NULL,
	"hash" text NOT NULL,
	"channel_id" text NOT NULL,
	"user_id" text NOT NULL,
	"nickname" varchar,
	"status" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"sub" text NOT NULL,
	"hash" text NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"photo_url" varchar,
	"status" varchar DEFAULT 'OFFLINE',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
