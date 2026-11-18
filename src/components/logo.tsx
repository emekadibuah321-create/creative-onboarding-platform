import Link from "next/link";

interface LogoProps {
  href?: string;
  tone?: "dark" | "light";
}

export function Logo({ href = "/", tone = "dark" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-serif text-xl font-bold">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="16 5" className={tone === "light" ? "text-white" : "text-primary"} />
        <circle cx="14" cy="14" r="4.5" className="fill-accent" />
      </svg>
      <span className={tone === "light" ? "text-white" : "text-primary"}>Ajo</span>
    </Link>
  );
}
