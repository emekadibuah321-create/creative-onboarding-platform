"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginAction } from "@/actions/auth";
import { TextField } from "@/components/text-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { signInSchema, type SignInValues } from "@/lib/validation";

interface SignInFormProps {
  justRegistered?: boolean;
}

export function SignInForm({ justRegistered = false }: SignInFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: SignInValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await loginAction(values);
      if (result.ok) {
        toast.success("Welcome back");
        router.push("/portal");
        router.refresh();
        return;
      }
      setFormError(result.message ?? "Could not sign you in.");
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {justRegistered && !formError && (
          <Alert className="mb-4 border-success/40 bg-success/10">
            <AlertTitle>Account created</AlertTitle>
            <AlertDescription>Sign in with the email and password you just chose.</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {formError && (
              <Alert variant="destructive">
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <TextField control={form.control} name="email" label="Email address" type="email" placeholder="ada@example.com" autoComplete="email" />
            <TextField control={form.control} name="password" label="Password" type="password" autoComplete="current-password" />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending && <Loader2 className="animate-spin" />}
              {pending ? "Signing in" : "Sign in"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          New to Ajo?{" "}
          <Link href="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
