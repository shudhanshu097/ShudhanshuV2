"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type FollowGlowProps = {
  children: ReactNode;
  glow: string;
  className?: string;
  tilt?: boolean;
  tiltStrength?: number;
};

export function FollowGlow({
  children,
  glow,
  className,
  tilt: enableTilt = false,
  tiltStrength = 18,
}: FollowGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowSoftRef = useRef<HTMLDivElement>(null);
  const glowInsetRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);
  const rafRef = useRef(0);
  const pendingRef = useRef({ x: 0, y: 0, tiltX: 0, tiltY: 0 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabledRef.current = !coarse && !reduced;
  }, []);

  const onMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const tiltX = enableTilt && enabledRef.current
      ? (e.clientY - rect.top - rect.height / 2) / tiltStrength
      : 0;
    const tiltY = enableTilt && enabledRef.current
      ? (e.clientX - rect.left - rect.width / 2) / -tiltStrength
      : 0;

    pendingRef.current = { x, y, tiltX, tiltY };
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const { x: px, y: py, tiltX: tx, tiltY: ty } = pendingRef.current;

      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.background = `radial-gradient(420px circle at ${px}% ${py}%, color-mix(in srgb, ${glow} 28%, transparent), transparent 42%)`;
      }
      if (glowSoftRef.current) {
        glowSoftRef.current.style.opacity = "1";
        glowSoftRef.current.style.background = `radial-gradient(180px circle at ${px}% ${py}%, color-mix(in srgb, ${glow} 22%, transparent), transparent 50%)`;
      }
      if (glowInsetRef.current) {
        glowInsetRef.current.style.opacity = "1";
      }

      ref.current.style.borderColor = `color-mix(in srgb, ${glow} 35%, transparent)`;

      if (enableTilt && enabledRef.current) {
        ref.current.style.transform = `perspective(700px) rotateX(${tx}deg) rotateY(${ty}deg)`;
      }

      rafRef.current = 0;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    if (glowRef.current) glowRef.current.style.opacity = "0";
    if (glowSoftRef.current) glowSoftRef.current.style.opacity = "0";
    if (glowInsetRef.current) glowInsetRef.current.style.opacity = "0";
    if (ref.current) {
      ref.current.style.borderColor = "";
      ref.current.style.transform = "";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "gpu-layer relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]",
        className
      )}
      style={{
        transition: "transform 0.15s ease-out, border-color 0.25s ease",
      }}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />
      <div
        ref={glowSoftRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ mixBlendMode: "soft-light" }}
      />
      <div
        ref={glowInsetRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${glow} 30%, transparent), inset 0 0 40px color-mix(in srgb, ${glow} 12%, transparent)`,
        } as CSSProperties}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
};

export function TiltCard({
  children,
  className,
  tiltStrength = 22,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);
  const rafRef = useRef(0);
  const pendingRef = useRef({ tiltX: 0, tiltY: 0 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabledRef.current = !coarse && !reduced;
  }, []);

  const onMove = (e: MouseEvent) => {
    if (!enabledRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pendingRef.current = {
      tiltX: (e.clientY - rect.top - rect.height / 2) / tiltStrength,
      tiltY: (e.clientX - rect.left - rect.width / 2) / -tiltStrength,
    };

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const { tiltX, tiltY } = pendingRef.current;
      ref.current.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      rafRef.current = 0;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "gpu-layer overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)]",
        className
      )}
      style={{ transition: "transform 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}
