import { boolean, integer, jsonb, numeric, pgEnum, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "brand", "specialist", "editor", "admin"]);
export const audienceSegment = pgEnum("audience_segment", ["b2b", "b2c", "both", "unknown"]);
export const toolStatus = pgEnum("tool_status", ["draft", "pending_review", "published", "archived"]);
export const reviewStatus = pgEnum("review_status", ["pending", "published", "rejected", "invalidated"]);
export const seasonStatus = pgEnum("season_status", ["draft", "scheduled", "active", "closed", "archived"]);

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(), slug: text("slug").notNull(), name: text("name").notNull(),
  description: text("description"), displayOrder: integer("display_order").notNull().default(0), active: boolean("active").notNull().default(true),
}, (table) => ({ slugIdx: uniqueIndex("categories_slug_idx").on(table.slug) }));

export const users = pgTable("users", {
  id: uuid("id").primaryKey(), email: text("email").notNull(), displayName: text("display_name"), role: userRole("role").notNull().default("user"),
  audience: audienceSegment("audience_segment").notNull().default("unknown"), locale: text("locale").notNull().default("es-ES"), country: text("country").notNull().default("ES"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({ emailIdx: uniqueIndex("users_email_idx").on(table.email) }));

export const tools = pgTable("tools", {
  id: uuid("id").defaultRandom().primaryKey(), slug: text("slug").notNull(), name: text("name").notNull(), vendorName: text("vendor_name").notNull(),
  description: text("description").notNull(), officialUrl: text("official_url").notNull(), logoUrl: text("logo_url"), primaryCategoryId: uuid("primary_category_id").references(() => categories.id),
  audiences: audienceSegment("audiences").array().notNull().default([]), difficulty: text("difficulty"), languages: text("languages").array().notNull().default([]),
  status: toolStatus("status").notNull().default("draft"), editorialStatus: text("editorial_status").notNull().default("pending_review"), lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({ slugIdx: uniqueIndex("tools_slug_idx").on(table.slug) }));

export const toolPlans = pgTable("tool_plans", {
  id: uuid("id").defaultRandom().primaryKey(), toolId: uuid("tool_id").notNull().references(() => tools.id), name: text("name").notNull(), pricingType: text("pricing_type").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }), currency: text("currency").notNull().default("EUR"), billingPeriod: text("billing_period"), hasFreeTrial: boolean("has_free_trial").notNull().default(false), source: text("source"), verifiedAt: timestamp("verified_at", { withTimezone: true }),
});

export const integrations = pgTable("integrations", { id: uuid("id").defaultRandom().primaryKey(), name: text("name").notNull(), slug: text("slug").notNull() }, (table) => ({ slugIdx: uniqueIndex("integrations_slug_idx").on(table.slug) }));
export const toolIntegrations = pgTable("tool_integrations", { toolId: uuid("tool_id").notNull().references(() => tools.id), integrationId: uuid("integration_id").notNull().references(() => integrations.id), source: text("source"), verifiedAt: timestamp("verified_at", { withTimezone: true }) }, (table) => ({ pk: primaryKey({ columns: [table.toolId, table.integrationId] }) }));

export const seasons = pgTable("seasons", { id: uuid("id").defaultRandom().primaryKey(), slug: text("slug").notNull(), name: text("name").notNull(), categoryId: uuid("category_id").references(() => categories.id), startsAt: timestamp("starts_at", { withTimezone: true }).notNull(), endsAt: timestamp("ends_at", { withTimezone: true }).notNull(), status: seasonStatus("status").notNull().default("draft"), rulesVersion: text("rules_version").notNull().default("v1") }, (table) => ({ slugIdx: uniqueIndex("seasons_slug_idx").on(table.slug) }));
export const seasonEntries = pgTable("season_entries", { id: uuid("id").defaultRandom().primaryKey(), seasonId: uuid("season_id").notNull().references(() => seasons.id), toolId: uuid("tool_id").notNull().references(() => tools.id), organicScore: numeric("organic_score", { precision: 10, scale: 4 }), finalRank: integer("final_rank") }, (table) => ({ uniqueEntry: uniqueIndex("season_entries_unique_idx").on(table.seasonId, table.toolId) }));

export const reviews = pgTable("reviews", { id: uuid("id").defaultRandom().primaryKey(), toolId: uuid("tool_id").notNull().references(() => tools.id), userId: uuid("user_id").notNull().references(() => users.id), seasonId: uuid("season_id").references(() => seasons.id), rating: integer("rating").notNull(), text: text("text").notNull(), status: reviewStatus("status").notNull().default("pending"), moderationReason: text("moderation_reason"), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull() });
export const votes = pgTable("votes", { id: uuid("id").defaultRandom().primaryKey(), toolId: uuid("tool_id").notNull().references(() => tools.id), userId: uuid("user_id").notNull().references(() => users.id), seasonId: uuid("season_id").notNull().references(() => seasons.id), status: text("status").notNull().default("valid"), riskFlags: jsonb("risk_flags"), invalidatedReason: text("invalidated_reason"), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull() }, (table) => ({ oneVote: uniqueIndex("votes_one_per_season_idx").on(table.toolId, table.userId, table.seasonId) }));

export const savedTools = pgTable("saved_tools", { userId: uuid("user_id").notNull().references(() => users.id), toolId: uuid("tool_id").notNull().references(() => tools.id), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull() }, (table) => ({ pk: primaryKey({ columns: [table.userId, table.toolId] }) }));
