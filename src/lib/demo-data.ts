// Demo data shown in the portal. A real product would load this from a payments service.
export interface Circle {
  id: number;
  name: string;
  members: number;
  contribution: number;
  frequency: "Weekly" | "Monthly";
  position: number;
  nextPayout: string;
  status: "Active" | "Filling" | "Completed";
  progress: number;
}

export const demoCircles: Circle[] = [
  { id: 1, name: "Lagos Designers Circle", members: 8, contribution: 25000, frequency: "Monthly", position: 3, nextPayout: "2026-12-05", status: "Active", progress: 38 },
  { id: 2, name: "Abuja Family Pot", members: 5, contribution: 10000, frequency: "Weekly", position: 5, nextPayout: "2027-01-10", status: "Active", progress: 60 },
  { id: 3, name: "Office Rent Cushion", members: 10, contribution: 15000, frequency: "Monthly", position: 7, nextPayout: "2027-04-01", status: "Filling", progress: 20 },
  { id: 4, name: "School Fees 2026", members: 6, contribution: 20000, frequency: "Monthly", position: 2, nextPayout: "2026-09-01", status: "Completed", progress: 100 },
];

export const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
