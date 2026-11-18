import { AuthShell } from "@/components/auth-shell";
import { SignInForm } from "@/components/sign-in-form";

export const metadata = { title: "Sign in | Ajo" };

interface SignInPageProps {
  searchParams: Promise<{ registered?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { registered } = await searchParams;
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to see your circles and your next payout.">
      <SignInForm justRegistered={registered === "1"} />
    </AuthShell>
  );
}
