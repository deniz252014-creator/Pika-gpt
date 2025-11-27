import z from "zod";

export const ChatMessageSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  role: z.string(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const UserProfileSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  device_preference: z.string(),
  credits: z.number(),
  has_unlimited_credits: z.boolean(),
  last_credit_refresh: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
