"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, siteConfig } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProfileIdentityCardProps = {
  compact?: boolean;
  className?: string;
};

export function ProfileIdentityCard({
  compact = false,
  className,
}: ProfileIdentityCardProps) {
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!coarse && !reduced);

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const onMove = (e: MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTilt({
      x: (e.clientY - rect.top - rect.height / 2) / 28,
      y: (e.clientX - rect.left - rect.width / 2) / -28,
    });
  };

  const featured = projects[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.35 }}
      className={cn(
        "flex flex-col items-start rounded-2xl border border-[var(--border)] bg-[var(--bg)]/80 p-4 backdrop-blur-md",
        compact && "p-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-full border border-[var(--border)]",
            compact ? "h-11 w-11" : "h-14 w-14"
          )}
        >
          <Image
            src={siteConfig.avatar}
            alt={siteConfig.name}
            fill
            className="object-cover"
            sizes="56px"
            priority
          />
        </div>
        <div>
          <h2
            className={cn(
              "font-bold leading-tight tracking-tight",
              compact ? "text-lg" : "text-xl"
            )}
          >
            Shudhanshu
          </h2>
          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-sky-500 dark:text-sky-400">
            Business Data Analyst
          </p>
        </div>
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="mt-3 w-full perspective-[800px]"
      >
        <motion.div
          style={{
            transform: enabled
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotate(-5deg)`
              : "rotate(-5deg)",
            transition: "transform 0.15s ease-out",
          }}
          className="rounded-lg border border-white/10 bg-[#141416] px-3 py-2 shadow-lg shadow-black/25"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={featured.slug}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="line-clamp-2 text-xs text-zinc-400"
            >
              {featured.title}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
