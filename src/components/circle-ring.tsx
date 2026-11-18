interface CircleRingProps {
  members: string[]; // initials, in payout order
  collector: number; // index of the member collecting this round
  pot: string;
}

/** Decorative hero graphic: members around a ring, one highlighted as this round's collector. */
export function CircleRing({ members, collector, pot }: CircleRingProps) {
  const size = 360;
  const c = size / 2;
  const r = 130;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`A circle of ${members.length} members. This round's pot is ${pot}.`} className="ring-in mx-auto w-full max-w-sm">
      <circle cx={c} cy={c} r={r} fill="none" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" className="stroke-primary-foreground/50" />
      {members.map((m, i) => {
        const a = (i / members.length) * Math.PI * 2 - Math.PI / 2;
        const x = c + r * Math.cos(a);
        const y = c + r * Math.sin(a);
        const active = i === collector;
        return (
          <g key={m + i}>
            <circle cx={x} cy={y} r={active ? 30 : 24} className={active ? "fill-accent" : "fill-primary-foreground"} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize={active ? 15 : 13} fontWeight="700" className={active ? "fill-accent-foreground" : "fill-primary"}>
              {m}
            </text>
          </g>
        );
      })}
      <text x={c} y={c - 6} textAnchor="middle" fontSize="13" className="fill-primary-foreground/70">
        This round&apos;s pot
      </text>
      <text x={c} y={c + 26} textAnchor="middle" fontSize="34" fontWeight="700" fontFamily="Georgia, serif" className="fill-primary-foreground">
        {pot}
      </text>
    </svg>
  );
}
