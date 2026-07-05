"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { quoteCopy } from "@/data/content";

export function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [visibleLines, setVisibleLines] = useState(0);
  const totalLines = 1 + quoteCopy.lines.length;

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
      className="relative flex min-h-screen items-center justify-center bg-[#000000] px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px max-w-md -translate-y-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visibleLines > 0 ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 h-px w-10 bg-white/20"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={
            visibleLines > 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[1.65rem] leading-relaxed tracking-[0.04em] text-white/95 sm:text-4xl md:text-[2.85rem] md:leading-snug"
        >
          {quoteCopy.sanskrit}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visibleLines > 0 ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="my-8 flex items-center justify-center gap-3"
          aria-hidden
        >
          <span className="h-px w-8 bg-white/10" />
          <span className="text-[10px] text-white/25">◆</span>
          <span className="h-px w-8 bg-white/10" />
        </motion.div>

        {quoteCopy.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 12 }}
            animate={
              visibleLines > i + 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-medium leading-snug tracking-tight text-zinc-400/95 sm:text-2xl md:text-[1.75rem] md:leading-snug"
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visibleLines >= totalLines ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 h-px w-10 bg-white/20"
        />
      </div>
    </section>
  );
}
