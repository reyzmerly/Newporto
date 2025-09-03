import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to submit a new contact form message
export const submitMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      subject: args.subject,
      message: args.message,
      timestamp: Date.now(),
      status: "new",
    });
    
    console.log(`New message received from ${args.name} (${args.email})`);
    return messageId;
  },
});

// Query to get all messages (for admin dashboard)
export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db
      .query("messages")
      .order("desc")
      .collect();
    
    return messages;
  },
});

// Query to get messages by status
export const getMessagesByStatus = query({
  args: {
    status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("status"), args.status))
      .order("desc")
      .collect();
    
    return messages;
  },
});

// Mutation to update message status
export const updateMessageStatus = mutation({
  args: {
    messageId: v.id("messages"),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      status: args.status,
    });
  },
});

// Query to get message count by status
export const getMessageCounts = query({
  args: {},
  handler: async (ctx) => {
    const allMessages = await ctx.db.query("messages").collect();
    
    const counts = {
      new: 0,
      read: 0,
      replied: 0,
      total: allMessages.length,
    };
    
    allMessages.forEach((message) => {
      counts[message.status]++;
    });
    
    return counts;
  },
});
