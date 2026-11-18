"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { updateProfile } from "@/lib/users";
import { profileSchema } from "@/lib/validation";
import type { ActionResult } from "@/actions/auth";

export async function updateProfileAction(input: unknown): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, message: "Your session has ended. Sign in again." };

  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields." };

  const user = updateProfile(session.user.id, parsed.data);
  if (!user) return { ok: false, message: "We could not find your account." };

  revalidatePath("/portal", "layout");
  return { ok: true, message: "Profile saved." };
}
