"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/magnetic";
import { FranciscaPhotoGallery } from "@/components/hero/francisca-photo-gallery";
import { useScrollToSection } from "@/components/smooth-scroll";
import { siteConfig } from "@/data/projects";

const ctaClassName =
  "rounded-full border border-[var(--border)] px-8 py-3 text-sm tracking-wide text-[var(--text-muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)]";

export function HeroSection() {
  const scrollTo = useScrollToSection();

  return (
    <section id="home" className="relative min-h-screen">
      <FranciscaPhotoGallery />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-8 text-center md:pt-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[11px] uppercase tracking-[0.45em] text-[var(--text-muted)]"
        >
          {siteConfig.institute}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 max-w-lg text-base text-[var(--text-muted)] md:text-lg"
        >
          {siteConfig.role} — simulation, strategy & analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => scrollTo("work")}
              className={ctaClassName}
            >
              View Work
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href={siteConfig.resumePath}
              download="Shudhanshu_Jaiswal_CV.pdf"
              className={ctaClassName}
            >
              Resume ↓
            </a>
          </Magnetic>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollTo("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
        >
          <span>Scroll</span>
          <span className="block h-8 w-px bg-[var(--border)]" />
        </motion.button>
      </div>
    </section>
  );
}
