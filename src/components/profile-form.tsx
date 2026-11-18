"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/profile";
import { TextField } from "@/components/text-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema, type ProfileValues } from "@/lib/validation";

interface ProfileFormProps {
  email: string;
  defaults: ProfileValues;
}

export function ProfileForm({ email, defaults }: ProfileFormProps) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const form = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), defaultValues: defaults });

  function onSubmit(values: ProfileValues) {
    setSaved(false);
    startTransition(async () => {
      const result = await updateProfileAction(values);
      if (result.ok) {
        setSaved(true);
        toast.success("Profile saved", { description: "Your changes are now live." });
        form.reset(values);
      } else {
        toast.error(result.message ?? "Could not save your profile");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit profile</CardTitle>
        <CardDescription>Update how you appear to the members of your circles.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {saved && (
              <Alert className="border-success/40 bg-success/10">
                <AlertTitle>Profile saved</AlertTitle>
                <AlertDescription>Your name and preferences are updated.</AlertDescription>
              </Alert>
            )}
            <TextField control={form.control} name="name" label="Full name" autoComplete="name" />
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email address</label>
              <Input id="email" value={email} disabled readOnly />
              <p className="text-sm text-muted-foreground">Your email is your sign-in name and cannot be changed here.</p>
            </div>
            <TextField control={form.control} name="phone" label="Phone number" type="tel" placeholder="+234 800 000 0000" autoComplete="tel" />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short bio</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Tell your circle a little about yourself" {...field} />
                  </FormControl>
                  <FormDescription>Up to 200 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred contribution schedule</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailUpdates"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />
                  </FormControl>
                  <div>
                    <FormLabel>Email me contribution reminders</FormLabel>
                    <FormDescription>We send one reminder before each due date.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending || !form.formState.isDirty}>
              {pending && <Loader2 className="animate-spin" />}
              {pending ? "Saving" : "Save changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
