import { aboutCopy } from "@/data/content";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-8 border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-[var(--text-muted)]">
          About
        </p>
        <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
          Background
        </h2>

        <p className="text-left text-base leading-[1.85] text-[var(--text-muted)] md:text-lg">
          {aboutCopy.paragraphs[0]}
        </p>

        <blockquote className="my-10 border-l-2 border-[var(--text)] pl-6 text-left text-lg italic leading-relaxed text-[var(--text)] md:text-xl">
          &ldquo;…{aboutCopy.pullQuote}.&rdquo;
        </blockquote>

        <p className="text-left text-base leading-[1.85] text-[var(--text-muted)] md:text-lg">
          {aboutCopy.paragraphs[1]}
        </p>
      </div>
    </section>
  );
}
