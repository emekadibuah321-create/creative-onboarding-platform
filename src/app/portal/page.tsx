import { Bell, CalendarClock, CircleDollarSign, Users, Wallet } from "lucide-react";
import { InviteDialog } from "@/components/invite-dialog";
import { StatCard } from "@/components/stat-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoCircles, formatDate, naira, type Circle } from "@/lib/demo-data";
import { requireUser } from "@/lib/session";

export const metadata = { title: "Your portal | Ajo" };

function StatusBadge({ status }: { status: Circle["status"] }) {
  if (status === "Active") return <Badge className="bg-success text-white">Active</Badge>;
  if (status === "Filling") return <Badge className="bg-accent text-accent-foreground">Filling</Badge>;
  return <Badge variant="outline">Completed</Badge>;
}

export default async function PortalPage() {
  const user = await requireUser();
  const firstName = user.name.split(" ")[0];
  const live = demoCircles.filter((c) => c.status !== "Completed");
  const contributed = demoCircles.reduce((sum, c) => sum + c.contribution * Math.round((c.progress / 100) * c.members), 0);
  const nextPayout = [...live].sort((a, b) => a.nextPayout.localeCompare(b.nextPayout))[0];
  const totalMembers = live.reduce((sum, c) => sum + c.members, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Welcome back, {firstName}</h1>
          <p className="mt-1 text-muted-foreground">
            Signed in as {user.name} ({user.email})
          </p>
        </div>
        <InviteDialog code={`AJO-${user.id.slice(0, 6).toUpperCase()}`} />
      </div>

      <Alert>
        <Bell />
        <AlertTitle>Next contribution is due on 1 December</AlertTitle>
        <AlertDescription>Lagos Designers Circle: {naira(25000)} to be paid by all 8 members.</AlertDescription>
      </Alert>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active circles" value={live.length} description="Including one still filling" icon={Users} />
        <StatCard title="Contributed so far" value={naira(contributed)} description="Across all your circles" icon={Wallet} />
        <StatCard title="Next payout" value={nextPayout ? formatDate(nextPayout.nextPayout) : "None"} description={nextPayout?.name ?? "Join a circle to get started"} icon={CalendarClock} />
        <StatCard title="Circle members" value={totalMembers} description="People you save with" icon={CircleDollarSign} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your circles</CardTitle>
          <CardDescription>Demo data. Position is the round in which you collect the pot.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Circle</TableHead>
                <TableHead>Contribution</TableHead>
                <TableHead>Your turn</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="min-w-32">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoCircles.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    {c.name}
                    <span className="block text-xs font-normal text-muted-foreground">{c.members} members</span>
                  </TableCell>
                  <TableCell>
                    {naira(c.contribution)} <span className="text-muted-foreground">{c.frequency.toLowerCase()}</span>
                  </TableCell>
                  <TableCell>Round {c.position}</TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>
                  <TableCell>
                    <Progress value={c.progress} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
