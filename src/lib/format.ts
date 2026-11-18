export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function memberSince(createdAt: string): string {
  // SQLite stores "YYYY-MM-DD HH:MM:SS" in UTC
  return new Date(createdAt.replace(" ", "T") + "Z").toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
