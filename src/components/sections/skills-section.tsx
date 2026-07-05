"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/content";
import { motionEase } from "@/components/smooth-scroll";

export function SkillsSection() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="scroll-mt-8 border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
          Skills
        </p>
        <h2 className="mb-10 text-4xl font-semibold tracking-tight sm:text-5xl">
          Toolkit
        </h2>

        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <div key={group.label}>
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <motion.button
                    key={skill.name}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.06 + gi * 0.1, ease: motionEase }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    onMouseEnter={() => setActiveTip(skill.tip)}
                    onMouseLeave={() => setActiveTip(null)}
                    className="skill-glide group relative overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 text-sm text-[var(--text)]"
                  >
                    <span
                      aria-hidden
                      className="skill-glide-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="relative z-[1]">{skill.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.p
          key={activeTip ?? "empty"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: activeTip ? 1 : 0, y: activeTip ? 0 : 6 }}
          transition={{ duration: 0.35, ease: motionEase }}
          className="mt-6 min-h-[1.25rem] text-sm text-[var(--text-muted)]"
        >
          {activeTip ?? ""}
        </motion.p>
      </div>
    </section>
  );
}
