import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// First line of defence: redirect unauthenticated visitors away from /portal.
// The portal layout re-checks the session on the server, so this is never the only guard.
export const proxy = NextAuth(authConfig).auth;

export const config = {
  matcher: ["/portal/:path*", "/signin", "/signup"],
};
