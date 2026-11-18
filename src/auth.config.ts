import type { NextAuthConfig } from "next-auth";

// Edge-safe config (no database imports). Used by the proxy for optimistic redirects.
export const authConfig = {
  pages: { signIn: "/signin" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const isPortal = pathname.startsWith("/portal");
      const isAuthPage = pathname === "/signin" || pathname === "/signup";
      if (isPortal) return isLoggedIn; // false => redirect to /signin
      if (isAuthPage && isLoggedIn) return Response.redirect(new URL("/portal", request.nextUrl));
      return true;
    },
  },
} satisfies NextAuthConfig;
