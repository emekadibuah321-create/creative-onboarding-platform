"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PortalNavItemProps {
  href: string;
  label: string;
  exact?: boolean;
}

/** Reusable nav item: highlights itself when its route is active. */
export function PortalNavItem({ href, label, exact = false }: PortalNavItemProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/75 hover:text-sidebar-foreground",
      )}
    >
      {label}
    </Link>
  );
}
