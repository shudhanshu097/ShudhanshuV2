"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(true);
  const rafRef = useRef(0);
  const pendingRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    enabledRef.current = !reduced && !coarse;
  }, []);

  const onMove = (e: MouseEvent) => {
    if (!enabledRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pendingRef.current = {
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    };

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const { x, y } = pendingRef.current;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      rafRef.current = 0;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={cn("gpu-layer inline-block", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
