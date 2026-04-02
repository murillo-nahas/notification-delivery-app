import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  phoneNumber: z.string().nullable(),
  email: z.email(),
});

export type UserSchema = z.infer<typeof userSchema>;