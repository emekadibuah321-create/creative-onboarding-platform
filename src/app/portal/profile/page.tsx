import { ProfileCard } from "@/components/profile-card";
import { ProfileForm } from "@/components/profile-form";
import { initialsOf, memberSince } from "@/lib/format";
import { requireUser } from "@/lib/session";

export const metadata = { title: "Profile | Ajo" };

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your profile</h1>
        <p className="mt-1 text-muted-foreground">Check your details and keep them up to date.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <ProfileCard
          name={user.name}
          email={user.email}
          initials={initialsOf(user.name)}
          phone={user.phone}
          bio={user.bio}
          memberSince={memberSince(user.createdAt)}
          frequency={user.frequency}
        />
        <div className="lg:col-span-2">
          <ProfileForm
            email={user.email}
            defaults={{ name: user.name, phone: user.phone, bio: user.bio, frequency: user.frequency, emailUpdates: user.emailUpdates }}
          />
        </div>
      </div>
    </div>
  );
}
