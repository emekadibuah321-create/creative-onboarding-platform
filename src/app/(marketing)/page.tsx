import Link from "next/link";
import { CalendarClock, HandCoins, Users, ShieldCheck, Eye, Bell } from "lucide-react";
import { CircleRing } from "@/components/circle-ring";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const steps = [
  { icon: Users, title: "Join a circle", text: "Start your own with people you trust, or accept an invitation to an existing one." },
  { icon: CalendarClock, title: "Contribute on schedule", text: "Everyone pays the same amount, weekly or monthly, on the dates the circle agrees." },
  { icon: HandCoins, title: "Collect your turn", text: "Each round, one member receives the whole pot until everyone has had a turn." },
];

const benefits = [
  { icon: Eye, title: "A visible payout order", text: "See who collects when, so nobody has to chase a notebook or a group chat." },
  { icon: Bell, title: "Reminders that help", text: "Gentle nudges before each contribution date keep the circle on time." },
  { icon: ShieldCheck, title: "Your account, protected", text: "Passwords are hashed and every portal page checks your session on the server." },
];

const audiences = [
  { value: "friends", label: "Friends", text: "Save towards a big purchase together, such as a laptop, a deposit or a trip, and take turns getting there first." },
  { value: "families", label: "Families", text: "Build a shared cushion for school fees, festive seasons and emergencies, with every contribution on record." },
  { value: "teams", label: "Teams", text: "Colleagues pool a fixed amount each month so every person gets a lump sum once per cycle." },
];

export default function LandingPage() {
  return (
    <div>
      <section className="adire text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Badge className="bg-accent text-accent-foreground">Savings circles, made simple</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">Save together. Collect in turns.</h1>
            <p className="mt-5 max-w-lg text-lg text-primary-foreground/80">
              Ajo gives your savings circle a home: one place to set the amount, fix the order and see whose turn it is, without a single spreadsheet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup">Create your free account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/signin">Sign in</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-primary-foreground/80">
              <div className="flex -space-x-2">
                {["AO", "TB", "CN", "FA"].map((i) => (
                  <Avatar key={i} className="size-8 border-2 border-primary">
                    <AvatarFallback className="bg-primary-foreground text-xs font-semibold text-primary">{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              Circles of 4 to 12 members
            </div>
          </div>
          <CircleRing members={["AO", "TB", "CN", "FA", "EI", "KM"]} collector={2} pot="₦150,000" />
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <h2 className="text-3xl font-bold">How a circle works</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">Three steps, repeated until everyone has collected.</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <s.icon className="size-5" />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                  <CardDescription>{s.text}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section id="benefits" className="scroll-mt-20 bg-secondary/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Why people use Ajo</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((b) => (
              <Card key={b.title}>
                <CardHeader>
                  <b.icon className="mb-2 size-6 text-primary" />
                  <CardTitle className="text-xl">{b.title}</CardTitle>
                  <CardDescription>{b.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="who-its-for" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <h2 className="text-3xl font-bold">Who it&apos;s for</h2>
        <Tabs defaultValue="friends" className="mt-6">
          <TabsList>
            {audiences.map((a) => (
              <TabsTrigger key={a.value} value={a.value}>
                {a.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {audiences.map((a) => (
            <TabsContent key={a.value} value={a.value}>
              <Card>
                <CardHeader>
                  <CardDescription className="max-w-prose text-base">{a.text}</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Ready to start your circle?</h2>
            <p className="mt-1 text-primary-foreground/80">Create an account, then invite the people you trust.</p>
          </div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/signup">Sign up free</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <Logo />
          <Separator className="md:hidden" />
          <p>Coursework demo. No real money moves in this app.</p>
        </div>
      </footer>
    </div>
  );
}
