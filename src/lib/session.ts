import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { findUserById, type User } from "@/lib/users";

/**
 * Server-side check used by every protected page. Verifies the signed session
 * cookie AND that the account still exists, otherwise redirects to /signin.
 */
export const requireUser = cache(async (): Promise<User> => {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");
  const user = findUserById(session.user.id);
  if (!user) redirect("/signin");
  return user;
});
