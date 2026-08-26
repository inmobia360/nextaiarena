CREATE TYPE "public"."audience_segment" AS ENUM('b2b', 'b2c', 'both', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'published', 'rejected', 'invalidated');--> statement-breakpoint
CREATE TYPE "public"."season_status" AS ENUM('draft', 'scheduled', 'active', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."tool_status" AS ENUM('draft', 'pending_review', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'brand', 'specialist', 'editor', 'admin');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "integrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tool_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"season_id" uuid,
	"rating" integer NOT NULL,
	"text" text NOT NULL,
	"status" "review_status" DEFAULT 'pending' NOT NULL,
	"moderation_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_tools" (
	"user_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "saved_tools_user_id_tool_id_pk" PRIMARY KEY("user_id","tool_id")
);
--> statement-breakpoint
CREATE TABLE "season_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"season_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"organic_score" numeric(10, 4),
	"final_rank" integer
);
--> statement-breakpoint
CREATE TABLE "seasons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"category_id" uuid,
	"starts_at" timestamp with time zone NOT NULL,
	"ends_at" timestamp with time zone NOT NULL,
	"status" "season_status" DEFAULT 'draft' NOT NULL,
	"rules_version" text DEFAULT 'v1' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tool_integrations" (
	"tool_id" uuid NOT NULL,
	"integration_id" uuid NOT NULL,
	"source" text,
	"verified_at" timestamp with time zone,
	CONSTRAINT "tool_integrations_tool_id_integration_id_pk" PRIMARY KEY("tool_id","integration_id")
);
--> statement-breakpoint
CREATE TABLE "tool_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tool_id" uuid NOT NULL,
	"name" text NOT NULL,
	"pricing_type" text NOT NULL,
	"amount" numeric(12, 2),
	"currency" text DEFAULT 'EUR' NOT NULL,
	"billing_period" text,
	"has_free_trial" boolean DEFAULT false NOT NULL,
	"source" text,
	"verified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"vendor_name" text NOT NULL,
	"description" text NOT NULL,
	"official_url" text NOT NULL,
	"logo_url" text,
	"primary_category_id" uuid,
	"audiences" "audience_segment"[] DEFAULT '{}' NOT NULL,
	"difficulty" text,
	"languages" text[] DEFAULT '{}' NOT NULL,
	"status" "tool_status" DEFAULT 'draft' NOT NULL,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"display_name" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"audience_segment" "audience_segment" DEFAULT 'unknown' NOT NULL,
	"locale" text DEFAULT 'es-ES' NOT NULL,
	"country" text DEFAULT 'ES' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tool_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"season_id" uuid NOT NULL,
	"status" text DEFAULT 'valid' NOT NULL,
	"risk_flags" jsonb,
	"invalidated_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_tools" ADD CONSTRAINT "saved_tools_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_tools" ADD CONSTRAINT "saved_tools_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "season_entries" ADD CONSTRAINT "season_entries_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "season_entries" ADD CONSTRAINT "season_entries_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_integrations" ADD CONSTRAINT "tool_integrations_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_integrations" ADD CONSTRAINT "tool_integrations_integration_id_integrations_id_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integrations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_plans" ADD CONSTRAINT "tool_plans_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tools" ADD CONSTRAINT "tools_primary_category_id_categories_id_fk" FOREIGN KEY ("primary_category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "integrations_slug_idx" ON "integrations" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "season_entries_unique_idx" ON "season_entries" USING btree ("season_id","tool_id");--> statement-breakpoint
CREATE UNIQUE INDEX "seasons_slug_idx" ON "seasons" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "tools_slug_idx" ON "tools" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "votes_one_per_season_idx" ON "votes" USING btree ("tool_id","user_id","season_id");