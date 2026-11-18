import type { ReactNode } from "react";
import { Logo } from "@/components/logo";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="adire hidden flex-col justify-between p-10 text-primary-foreground lg:flex">
        <Logo tone="light" />
        <div className="max-w-md">
          <h2 className="text-4xl font-bold leading-tight">Everyone puts in. Everyone takes a turn.</h2>
          <p className="mt-4 text-primary-foreground/80">
            Ajo circles turn small, regular contributions into a payout you can plan around, and keep every member&apos;s turn visible to the whole group.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">Coursework demo. No real money moves in this app.</p>
      </aside>
      <main className="flex flex-col justify-center px-4 py-10 sm:px-10">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-1 mb-6 text-muted-foreground">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
