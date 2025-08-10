import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to submit a contact form message
export const submitContactForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email format");
    }

    // Validate required fields
    if (!args.name.trim() || !args.email.trim() || !args.message.trim()) {
      throw new Error("Name, email, and message are required");
    }

    // Store the message in the database
    const messageId = await ctx.db.insert("messages", {
      name: args.name.trim(),
      email: args.email.trim(),
      phone: args.phone.trim(),
      subject: args.subject.trim(),
      message: args.message.trim(),
      status: "new", // Status: new, read, replied
      timestamp: Date.now(),
    });

    return { success: true, messageId };
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

// Mutation to update message status
export const updateMessageStatus = mutation({
  args: {
    messageId: v.id("messages"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      status: args.status,
    });
    
    return { success: true };
  },
});
