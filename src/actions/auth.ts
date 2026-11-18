"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { createUser, emailExists } from "@/lib/users";
import { signInSchema, signUpSchema } from "@/lib/validation";

export interface ActionResult {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function registerAction(input: unknown): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return { ok: false, message: "Please fix the highlighted fields.", fieldErrors };
  }
  const { name, email, password } = parsed.data;
  if (emailExists(email)) {
    return {
      ok: false,
      message: "An account with this email already exists.",
      fieldErrors: { email: "This email is already registered. Try signing in instead." },
    };
  }
  await createUser({ name, email, password });
  return { ok: true, message: "Account created. Sign in to continue." };
}

export async function loginAction(input: unknown): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Enter a valid email and password." };
  try {
    await signIn("credentials", { ...parsed.data, redirect: false });
    return { ok: true, message: "Signed in." };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, message: "Email or password is incorrect. Check both and try again." };
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
