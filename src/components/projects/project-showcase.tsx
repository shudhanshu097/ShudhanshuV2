"use client";

import { ProjectLink } from "@/components/project-link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/follow-glow";
import { Magnetic } from "@/components/magnetic";
import { MiniProjectPreview } from "@/components/projects/mini-project-preview";
import { motionEase } from "@/components/smooth-scroll";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const accentMap: Record<string, { glow: string }> = {
  "tea-stall": { glow: "#d97706" },
  "siren-care": { glow: "#7c3aed" },
  olist: { glow: "#0891b2" },
};

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const accent = accentMap[project.slug];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
      <FeaturedPanel project={project} accent={accent} />

      <nav className="flex flex-col gap-1 lg:pt-2" aria-label="Project index">
        {projects.map((p, i) => {
          const isActive = i === active;
          const itemAccent = accentMap[p.slug];

          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "group relative rounded-xl px-4 py-4 text-left transition-colors duration-300",
                isActive
                  ? "bg-[var(--bg-surface)]"
                  : "hover:bg-[var(--bg-surface)]/60"
              )}
            >
              <span
                className={cn(
                  "absolute left-0 top-4 bottom-4 w-0.5 rounded-full transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                )}
                style={{ backgroundColor: itemAccent.glow }}
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                0{i + 1} · {p.tag}
              </span>
              <span
                className={cn(
                  "mt-1 block text-sm font-medium leading-snug transition-colors",
                  isActive ? "text-[var(--text)]" : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                )}
              >
                {p.title}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function FeaturedPanel({
  project,
  accent,
}: {
  project: Project;
  accent: { glow: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, ease: motionEase }}
    >
      <TiltCard tiltStrength={24}>
        <AnimatePresence mode="wait">
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.42, ease: motionEase }}
          className="p-5 md:p-6"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.35, ease: motionEase }}
                className="inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
              >
                {project.tag}
              </motion.span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {project.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {project.result.slice(0, 2).map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.35, ease: motionEase }}
                    className="flex gap-2 text-xs leading-relaxed text-[var(--text-muted)]"
                  >
                    <span style={{ color: accent.glow }}>→</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tools.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] text-[var(--text-muted)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-5 lg:hidden">
                <MiniProjectPreview slug={project.slug} />
              </div>

              <div className="mt-5">
                <Magnetic strength={0.28}>
                  <ProjectLink
                    href={`/projects/${project.slug}?from=work`}
                    scroll={false}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-sm"
                      style={{ color: accent.glow }}
                    >
                      →
                    </span>
                    Full case study &amp; dashboard
                  </ProjectLink>
                </Magnetic>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: motionEase }}
              className="hidden lg:block"
            >
              <MiniProjectPreview slug={project.slug} />
              <p className="mt-2 text-[10px] leading-relaxed text-[var(--text-muted)]">
                Preview only — open case study for full charts &amp; analysis.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      </TiltCard>
    </motion.div>
  );
}
