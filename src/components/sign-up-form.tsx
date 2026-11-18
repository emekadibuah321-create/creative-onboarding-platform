"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerAction } from "@/actions/auth";
import { TextField } from "@/components/text-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { signUpSchema, type SignUpValues } from "@/lib/validation";

export function SignUpForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  function onSubmit(values: SignUpValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await registerAction(values);
      if (result.ok) {
        toast.success("Account created", { description: "Sign in with your new details." });
        router.push("/signin?registered=1");
        return;
      }
      setFormError(result.message ?? "Something went wrong. Try again.");
      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        form.setError(field as keyof SignUpValues, { message });
      }
      toast.error("Could not create your account");
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {formError && (
              <Alert variant="destructive">
                <AlertTitle>Sign up failed</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <TextField control={form.control} name="name" label="Full name" placeholder="Ada Okafor" autoComplete="name" />
            <TextField control={form.control} name="email" label="Email address" type="email" placeholder="ada@example.com" autoComplete="email" />
            <TextField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              description="At least 8 characters, with a letter and a number."
            />
            <TextField control={form.control} name="confirmPassword" label="Confirm password" type="password" autoComplete="new-password" />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending && <Loader2 className="animate-spin" />}
              {pending ? "Creating account" : "Create account"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
