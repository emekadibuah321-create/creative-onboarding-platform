import { CalendarDays, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileCardProps {
  name: string;
  email: string;
  initials: string;
  phone: string;
  bio: string;
  memberSince: string;
  frequency: string;
}

export function ProfileCard({ name, email, initials, phone, bio, memberSince, frequency }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <Avatar className="size-20">
          <AvatarFallback className="bg-primary text-2xl font-semibold text-primary-foreground">{initials}</AvatarFallback>
        </Avatar>
        <h2 className="mt-2 text-xl font-bold">{name}</h2>
        <Badge variant="secondary">Prefers {frequency} circles</Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-center text-muted-foreground">{bio || "No bio yet. Add one in the form."}</p>
        <Separator />
        <p className="flex items-center gap-2">
          <Mail className="size-4 text-muted-foreground" /> <span className="truncate">{email}</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="size-4 text-muted-foreground" /> {phone || "No phone added"}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted-foreground" /> Member since {memberSince}
        </p>
      </CardContent>
    </Card>
  );
}
