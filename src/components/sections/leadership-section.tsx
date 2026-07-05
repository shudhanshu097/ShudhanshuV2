import { LeadershipCounters } from "@/components/counter-roll-up";
import { LeadershipCard } from "@/components/leadership-card";
import { leadershipCards } from "@/data/content";

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="scroll-mt-8 border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
          Operations Leadership
        </p>
        <h2 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Mess Committee, IIM Jammu
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
          Not just classroom projects — real money, real people, real deadlines.
          Same mindset I bring to data: messy reality → clear decisions.
        </p>

        <LeadershipCounters />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {leadershipCards.map((item, index) => (
            <LeadershipCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
