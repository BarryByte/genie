import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { emitWarning, title } from "process";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number(),
    orderId: v.optional(v.string()),
  }),
  userAiAssistants: defineTable({
    id: v.number(),
    name: v.string(),
    title: v.string(),
    image: v.string(),
    instruction: v.string(),
    userInstruction: v.string(),
    sampleQuestions: v.any(),
    uid: v.id("users"),
  }),
});
