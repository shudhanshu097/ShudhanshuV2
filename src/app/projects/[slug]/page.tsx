import { ProjectLink } from "@/components/project-link";
import { HomeSectionLink } from "@/components/home-section-link";
import { notFound } from "next/navigation";
import { NextProjectBridge } from "@/components/next-project-bridge";
import { ProjectDetailVisuals } from "@/components/projects/project-detail-visuals";
import {
  getAdjacentProjects,
  getProject,
  projects,
} from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return { title: `${project.title} — Shudhanshu Jaiswal` };
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
        {label}
      </p>
      <div className="text-[var(--text-muted)]">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const index = projects.findIndex((p) => p.slug === slug);

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-24 pb-40">
        <nav className="mb-10 text-sm text-[var(--text-muted)]">
          <HomeSectionLink section="work" className="hover:text-[var(--text)]">
            Work
          </HomeSectionLink>
          <span className="mx-2">→</span>
          <span className="text-[var(--text)]">{project.title}</span>
        </nav>

        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
          0{index + 1} / 0{projects.length} · {project.tag}
        </p>
        <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mb-16 text-lg leading-relaxed text-[var(--text-muted)]">
          {project.summary}
        </p>

        <ProjectDetailVisuals project={project} />

        <Section label="Problem">
          <p className="text-lg leading-relaxed">{project.problem}</p>
        </Section>

        <Section label="Data">
          <ul className="space-y-3">
            {project.data.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="text-[var(--text)]">▪</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Analysis">
          <ul className="space-y-3">
            {project.analysis.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="text-[var(--text)]">▪</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Result">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6">
            <ul className="space-y-3">
              {project.result.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-[var(--text)]">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section label="Tools">
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </Section>

        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--border)] pt-8 text-sm">
          {prev ? (
            <ProjectLink
              href={`/projects/${prev.slug}?from=work`}
              scroll={false}
              className="text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              ← {prev.tag}
            </ProjectLink>
          ) : (
            <span />
          )}
          {next ? (
            <ProjectLink
              href={`/projects/${next.slug}?from=work`}
              scroll={false}
              className="text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {next.tag} →
            </ProjectLink>
          ) : (
            <HomeSectionLink
              section="leadership"
              className="text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              Leadership →
            </HomeSectionLink>
          )}
        </div>
      </main>

      <NextProjectBridge currentSlug={slug} />
    </>
  );
}
