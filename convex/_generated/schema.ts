import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    subject: v.string(),
    message: v.string(),
    timestamp: v.number(),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
  }),
});
