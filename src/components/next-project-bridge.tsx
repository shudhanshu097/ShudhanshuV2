"use client";

import { ProjectLink } from "@/components/project-link";
import { projects } from "@/data/projects";
import { Magnetic } from "@/components/magnetic";
import { cn } from "@/lib/utils";

type NextProjectBridgeProps = {
  currentSlug: string;
};

export function NextProjectBridge({ currentSlug }: NextProjectBridgeProps) {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="sticky bottom-0 z-20 border-t border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 overflow-x-auto px-6 py-4">
        {projects.map((project, i) => {
          const isActive = project.slug === currentSlug;
          return (
            <ProjectLink
              key={project.slug}
              href={`/projects/${project.slug}?from=work`}
              scroll={false}
              className={cn(
                "shrink-0 rounded-2xl border px-4 py-3 transition-all duration-300",
                isActive
                  ? "scale-105 border-[var(--text)] bg-[var(--bg-surface)]"
                  : "border-[var(--border)] opacity-60 hover:opacity-100"
              )}
            >
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                0{i + 1}
              </p>
              <p className="text-sm font-medium">{project.tag}</p>
            </ProjectLink>
          );
        })}
      </div>

      {next && (
        <div className="border-t border-[var(--border)] px-6 py-4 text-center">
          <Magnetic strength={0.35}>
            <ProjectLink
              href={`/projects/${next.slug}?from=work`}
              scroll={false}
              className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              Next Project: {next.title} →
            </ProjectLink>
          </Magnetic>
        </div>
      )}
    </div>
  );
}
