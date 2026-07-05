import { ProjectShowcase } from "@/components/projects/project-showcase";

export function WorkSection() {
  return (
    <section
      id="work"
      className="scroll-mt-8 border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
          Selected Work
        </p>
        <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Projects
        </h2>
        <p className="mb-12 max-w-xl text-[var(--text-muted)]">
          Summaries and previews below — full dashboards and write-ups live inside each
          case study.
        </p>

        <ProjectShowcase />
      </div>
    </section>
  );
}
