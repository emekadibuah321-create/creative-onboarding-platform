import { Logo } from "@/components/logo";
import { PortalNavItem } from "@/components/portal-nav";
import { UserMenu } from "@/components/user-menu";
import { requireUser } from "@/lib/session";
import { initialsOf } from "@/lib/format";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  // Server-side guard: nothing in /portal renders without a valid session.
  const user = await requireUser();

  return (
    <div className="min-h-screen">
      <header className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-6">
            <Logo href="/portal" tone="light" />
            <nav className="flex items-center gap-1" aria-label="Portal">
              <PortalNavItem href="/portal" label="Overview" exact />
              <PortalNavItem href="/portal/profile" label="Profile" />
            </nav>
          </div>
          <UserMenu name={user.name} email={user.email} initials={initialsOf(user.name)} />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl p-4 md:p-8">{children}</main>
    </div>
  );
}
