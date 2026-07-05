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
  const background = assetPath("/photos/quote-mountains.jpg");

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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[var(--bg)]/72 dark:bg-[var(--bg)]/76"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/90 via-[var(--bg)]/25 to-[var(--bg)]/90"
      />

      <div className="relative z-[1] max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={visibleLines > 0 ? { opacity: 0.35 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 block font-serif text-6xl leading-none text-[var(--text)] md:text-7xl"
          aria-hidden
        >
          &ldquo;
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={
            visibleLines > 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl font-medium leading-relaxed tracking-tight text-[var(--text)]/95 sm:text-2xl md:text-[1.75rem] md:leading-snug"
        >
          {quoteCopy.lead}
        </motion.p>

        {quoteCopy.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 12 }}
            animate={
              visibleLines > i + 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-xl font-medium leading-relaxed tracking-tight text-[var(--text-muted)] sm:text-2xl md:text-[1.75rem] md:leading-snug"
          >
            {line}
          </motion.p>
        ))}

        <motion.span
          initial={{ opacity: 0 }}
          animate={visibleLines >= totalLines ? { opacity: 0.35 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 block font-serif text-6xl leading-none text-[var(--text)] md:text-7xl"
          aria-hidden
        >
          &rdquo;
        </motion.span>
      </div>
    </section>
  );
}
