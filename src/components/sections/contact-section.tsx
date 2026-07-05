"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { Magnetic } from "@/components/magnetic";
import { aboutCopy } from "@/data/content";
import { siteConfig } from "@/data/projects";

function CopyRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {label}
        </p>
        <a href={href} className="mt-0.5 block truncate text-sm hover:underline">
          {value}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)] transition-colors hover:border-[var(--text-muted)] hover:text-[var(--text)]"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function TiltGlowCard({
  children,
  glow = "#60a5fa",
  className = "",
}: {
  children: ReactNode;
  glow?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabledRef.current = !coarse && !reduced;
  }, []);

  const onMove = (e: MouseEvent) => {
    if (!enabledRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const tiltX = (e.clientY - rect.top - rect.height / 2) / 28;
    const tiltY = (e.clientX - rect.left - rect.width / 2) / -28;
    ref.current.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        "--glow": glow,
        transition: "transform 0.18s ease-out, box-shadow 0.35s ease, border-color 0.35s ease",
      } as CSSProperties}
      className={`edge-glow-hover gpu-layer relative rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] ${className}`}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

const statusItems = [
  { label: "Currently", value: "IPM @ IIM Jammu" },
  { label: "Focus", value: "Simulation · Strategy · Analytics" },
  { label: "Open to", value: "Internships & project collaborations" },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-8 border-t border-[var(--border)] px-6 py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-[11px] uppercase tracking-[0.4em] text-[var(--text-muted)]">
          Contact
        </p>
        <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
          Get in touch
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Magnetic strength={0.2} className="block h-full">
            <TiltGlowCard glow="#60a5fa" className="h-full px-5 py-2">
              <CopyRow
                label="Personal"
                value={siteConfig.personalEmail}
                href={`mailto:${siteConfig.personalEmail}`}
              />
              <CopyRow
                label="College"
                value={siteConfig.collegeEmail}
                href={`mailto:${siteConfig.collegeEmail}`}
              />
              <div className="py-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Phone
                </p>
                <a href={`tel:${siteConfig.phone}`} className="mt-0.5 block text-sm">
                  {siteConfig.phone}
                </a>
              </div>
            </TiltGlowCard>
          </Magnetic>

          <Magnetic strength={0.18} className="block h-full">
            <TiltGlowCard glow="#a78bfa" className="flex h-full flex-col justify-between p-6 md:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--text-muted)]">
                  Let&apos;s connect
                </p>
                <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight md:text-[1.65rem]">
                  Data into narrative.
                  <br />
                  Narrative into impact.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {aboutCopy.paragraphs[1].slice(0, 120)}…
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {statusItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-3 last:border-0"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {item.label}
                    </span>
                    <span className="text-right text-sm text-[var(--text)]">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={`mailto:${siteConfig.personalEmail}?subject=Hello%20Shudhanshu`}
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-violet-400">
                    →
                  </span>
                  Start a conversation
                </a>
              </div>
            </TiltGlowCard>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
