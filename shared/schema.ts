import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  nickname: text("nickname"),
  ageGroup: text("age_group"),
  phone: text("phone"),
  email: text("email"),
});

export const companions = pgTable("companions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  pricePerMinute: real("price_per_minute").notNull(),
  interests: text("interests").array().notNull(),
  languages: text("languages").array().notNull(),
  ageGroup: text("age_group").notNull(),
  isOnline: boolean("is_online").default(false),
  totalCalls: integer("total_calls").default(0),
  rating: real("rating").default(5.0),
});

export const calls = pgTable("calls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  callerId: varchar("caller_id").notNull(),
  companionId: varchar("companion_id"),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  durationMinutes: integer("duration_minutes").default(0),
  callType: text("call_type").notNull(),
  isPaid: boolean("is_paid").default(false),
  totalCost: real("total_cost").default(0),
});

export const insertUserSchema = createInsertSchema(users).extend({
  username: z.string().min(1),
  password: z.string().min(1),
  nickname: z.string().optional().nullable(),
  ageGroup: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
});

export const insertCompanionSchema = createInsertSchema(companions).omit({
  id: true,
  totalCalls: true,
  rating: true,
});

export const insertCallSchema = createInsertSchema(calls).omit({
  id: true,
  startTime: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCompanion = z.infer<typeof insertCompanionSchema>;
export type Companion = typeof companions.$inferSelect;

export type InsertCall = z.infer<typeof insertCallSchema>;
export type Call = typeof calls.$inferSelect;

export const ageGroups = ["18-29", "30-44", "45-59", "60+"] as const;
export type AgeGroup = typeof ageGroups[number];

export const interestTags = [
  "Books", "Music", "Movies", "Travel", "Cooking", "Gardening", 
  "Sports", "Art", "Technology", "History", "Parenting", "Pets",
  "Health", "Spirituality", "Games", "Nature", "Photography", "Writing"
] as const;
