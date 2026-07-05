"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { quoteCopy } from "@/data/content";
import { assetPath } from "@/lib/asset-path";

export function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [visibleLines, setVisibleLines] = useState(0);
  const totalLines = 1 + quoteCopy.lines.length;
  const texture = assetPath("/photos/quote-texture.png");

  useEffect(() => {
    if (!isInView) return;
    let line = 0;
    const interval = setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= totalLines) clearInterval(interval);
    }, 650);
    return () => clearInterval(interval);
  }, [isInView, totalLines]);

  return (
    <section
      id="quote"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${texture})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[var(--bg)]/78 dark:bg-[var(--bg)]/82"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/20 to-[var(--bg)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] mix-blend-soft-light dark:opacity-[0.22]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, color-mix(in srgb, var(--text) 8%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 dark:opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 40%, color-mix(in srgb, var(--text) 4%, transparent) 50%, transparent 60%)",
        }}
      />

      <div className="relative z-[1] max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visibleLines > 0 ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 h-px w-10 bg-[var(--text)]/20"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={
            visibleLines > 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[1.55rem] italic leading-relaxed tracking-[0.02em] text-[var(--text)]/92 sm:text-3xl md:text-[2.35rem] md:leading-snug"
        >
          {quoteCopy.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visibleLines > 0 ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="my-8 flex items-center justify-center gap-3"
          aria-hidden
        >
          <span className="h-px w-8 bg-[var(--text)]/12" />
          <span className="text-[10px] text-[var(--text-muted)]">◆</span>
          <span className="h-px w-8 bg-[var(--text)]/12" />
        </motion.div>

        {quoteCopy.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 12 }}
            animate={
              visibleLines > i + 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg font-medium leading-snug tracking-tight text-[var(--text-muted)] sm:text-xl md:text-[1.55rem] md:leading-snug"
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visibleLines >= totalLines ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 h-px w-10 bg-[var(--text)]/20"
        />
      </div>
    </section>
  );
}
