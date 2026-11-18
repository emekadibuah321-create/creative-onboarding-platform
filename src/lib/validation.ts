import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name (at least 2 characters)."),
    email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address, like ada@example.com."),
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[A-Za-z]/, "Include at least one letter.")
      .regex(/[0-9]/, "Include at least one number."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const signInSchema = z.object({
  email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name (at least 2 characters)."),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long.")
    .regex(/^[0-9+\s-]*$/, "Use digits, spaces, + or - only."),
  bio: z.string().trim().max(200, "Keep your bio under 200 characters."),
  frequency: z.enum(["weekly", "monthly"]),
  emailUpdates: z.boolean(),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
