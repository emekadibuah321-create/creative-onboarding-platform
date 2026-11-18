import { AuthShell } from "@/components/auth-shell";
import { SignUpForm } from "@/components/sign-up-form";

export const metadata = { title: "Create your account | Ajo" };

export default function SignUpPage() {
  return (
    <AuthShell title="Create your account" subtitle="It takes a minute. You can join or start a circle straight after.">
      <SignUpForm />
    </AuthShell>
  );
}
