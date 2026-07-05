"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

function CounterItem({ value, suffix = "", prefix = "", label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(value * eased);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
    </div>
  );
}

export function LeadershipCounters() {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
      <CounterItem value={18} suffix="L+" prefix="₹" label="Monthly ops managed" />
      <CounterItem value={550} suffix="+" label="Students served daily" />
      <CounterItem value={3} label="Stakeholder groups aligned" />
    </div>
  );
}
