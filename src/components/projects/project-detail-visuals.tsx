"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { useInView } from "framer-motion";
import type { Project } from "@/data/projects";

const glowBySlug: Record<string, string> = {
  "tea-stall": "#f59e0b",
  "siren-care": "#8b5cf6",
  olist: "#22d3ee",
};

function useCountUp(target: number, active: boolean, prefix = "", suffix = "") {
  const [value, setValue] = useState(active ? target : 0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    setValue(0);
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      frame += 1;
      if (frame % 2 === 0 || p >= 1) {
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      }
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return `${prefix}${value.toLocaleString("en-IN")}${suffix}`;
}

function TiltGlowPanel({
  children,
  glow,
  className = "",
}: {
  children: ReactNode;
  glow: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);
  const rafRef = useRef(0);
  const pendingRef = useRef({ tiltX: 0, tiltY: 0 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    enabledRef.current = !coarse;
  }, []);

  const onMove = (e: MouseEvent) => {
    if (!enabledRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pendingRef.current = {
      tiltX: (e.clientY - rect.top - rect.height / 2) / 30,
      tiltY: (e.clientX - rect.left - rect.width / 2) / -30,
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
      style={{
        "--glow": glow,
        transition: "transform 0.18s ease-out, box-shadow 0.35s ease",
      } as CSSProperties}
      className={`edge-glow-hover gpu-layer dashboard-shell ${className}`}
    >
      {children}
    </div>
  );
}

function DashboardHeader({ tag }: { tag: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-[11px] text-zinc-500">{tag} · Live Preview</span>
      </div>
      <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        Modeled
      </span>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-sm"
      style={accent ? { boxShadow: `inset 0 1px 0 0 ${accent}33` } : undefined}
    >
      <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-white">{value}</p>
      {sub && (
        <p className="mt-0.5 text-[10px]" style={{ color: accent }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function GridBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />
  );
}

function VerticalBarChart({
  bars,
  active,
  accent,
  height = 160,
  labels,
}: {
  bars: number[];
  active: boolean;
  accent: string;
  height?: number;
  labels?: string[];
}) {
  const max = Math.max(...bars);

  return (
    <div className="flex gap-1.5" style={{ height }}>
      {bars.map((value, i) => {
        const barHeight = active ? Math.max(8, (value / max) * (height - 24)) : 6;
        return (
          <div
            key={i}
            className="flex flex-1 flex-col items-center justify-end gap-1"
            style={{ height }}
          >
            <div
              className="w-full rounded-t-sm transition-all duration-700 ease-out"
              style={{
                height: barHeight,
                transitionDelay: `${i * 40}ms`,
                background: `linear-gradient(to top, ${accent}cc 0%, ${accent} 45%, #fde68a 100%)`,
                boxShadow: active ? `0 0 16px -3px ${accent}88, inset 0 1px 0 rgba(255,255,255,0.25)` : "none",
              }}
            />
            {labels?.[i] && (
              <span className="text-[7px] text-zinc-600">{labels[i]}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TeaStallDashboard({ active }: { active: boolean; uid: string }) {
  const revenue = useCountUp(4735, active, "₹");
  const customers = useCountUp(135, active);
  const avgRev = useCountUp(35, active, "₹");
  const zeroWait = useCountUp(54, active, "", "%");
  const throughput = [28, 42, 55, 68, 88, 76, 62, 48, 72, 94, 82, 58, 44, 66, 91, 74];

  return (
    <>
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <KpiCard label="Simulated Revenue" value={revenue} accent="#f59e0b" />
        <KpiCard label="Customers" value={customers} accent="#f59e0b" />
        <KpiCard label="Avg / Customer" value={avgRev} sub="per transaction" accent="#fbbf24" />
        <KpiCard label="Zero Wait" value={zeroWait} sub="off-peak load" accent="#34d399" />
      </div>

      <div className="relative mb-3 overflow-hidden rounded-xl border border-white/[0.06] bg-black/50 p-4">
        <GridBackdrop />
        <div className="relative mb-2 flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
            Queue throughput · Monte Carlo run
          </p>
          <span className="text-[9px] text-amber-400/80">135 iterations · FIFO</span>
        </div>
        <div className="relative flex gap-3">
          <div className="flex flex-col justify-between py-1 text-[8px] text-zinc-600">
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>
          <div className="relative flex-1 border-b border-l border-white/[0.08] pb-1 pl-1">
            <VerticalBarChart bars={throughput} active={active} accent="#f59e0b" height={152} />
          </div>
        </div>
        <p className="relative mt-2 text-[10px] text-zinc-500">
          Peak rush creates bottleneck — adding 1 server cuts wait dramatically
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Wait Time Split</p>
          <div className="space-y-1.5">
            {[
              { label: "0 min", w: 54, c: "#34d399" },
              { label: "1–2 min", w: 22, c: "#fbbf24" },
              { label: "3–5 min", w: 14, c: "#f97316" },
              { label: "5+ min", w: 10, c: "#ef4444" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <span className="w-10 text-[9px] text-zinc-500">{row.label}</span>
                <div className="h-1.5 flex-1 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: active ? `${row.w}%` : "4%",
                      background: row.c,
                      boxShadow: `0 0 8px -2px ${row.c}88`,
                    }}
                  />
                </div>
                <span className="w-7 text-right text-[9px] text-zinc-400">{row.w}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Product Mix</p>
          <div className="space-y-1.5 text-[10px] text-zinc-400">
            <div className="flex justify-between"><span>Cigarettes</span><span className="text-white">30.7%</span></div>
            <div className="flex justify-between"><span>College Students</span><span className="text-white">38.7%</span></div>
            <div className="flex justify-between"><span>Service Time</span><span className="text-white">1–2 min</span></div>
            <div className="flex justify-between"><span>Server Model</span><span className="text-amber-400">Single FIFO</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

function SirenCareDashboard({ active, uid }: { active: boolean; uid: string }) {
  const risk = useCountUp(68, active, "", "%");
  const diabetics = useCountUp(853, active, "", "M");

  return (
    <>
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <KpiCard label="DFU Risk Reduced" value={risk} sub="clinical validation" accent="#a78bfa" />
        <KpiCard label="Diabetics by 2050" value={diabetics} sub="global TAM" accent="#a78bfa" />
        <KpiCard label="Amputation Risk" value="↓83%" sub="vs traditional" accent="#34d399" />
        <KpiCard label="B2C Price Point" value="$30/mo" sub="Medicare unlock" accent="#f472b6" />
      </div>

      <div className="mb-3 grid gap-2 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl border border-violet-500/25 bg-violet-950/40 p-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(circle at 70% 30%, rgba(139,92,246,0.4), transparent 60%)",
            }}
          />
          <p className="relative text-[9px] uppercase tracking-[0.2em] text-violet-300/70">
            Competitive Positioning Matrix
          </p>
          <div className="relative mt-1 flex justify-between text-[8px] text-zinc-500">
            <span>← Low monitoring</span>
            <span>High monitoring →</span>
          </div>
          <div className="relative mt-2 grid h-36 grid-cols-2 grid-rows-2 gap-1.5">
            {[
              { label: "Traditional Podiatry", highlight: false },
              { label: "Orpyx", highlight: false },
              { label: "Podimetrics", highlight: false },
              { label: "Siren Care ★", highlight: true },
            ].map((cell) => (
              <div
                key={cell.label}
                className="flex items-center justify-center rounded-md border p-1 text-center text-[9px] transition-all duration-500"
                style={{
                  borderColor: cell.highlight ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.08)",
                  background: cell.highlight
                    ? "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(139,92,246,0.2))"
                    : "rgba(255,255,255,0.02)",
                  color: cell.highlight ? "#ede9fe" : "#71717a",
                  boxShadow: cell.highlight && active ? "0 0 24px -4px rgba(139,92,246,0.8)" : "none",
                }}
              >
                {cell.label}
              </div>
            ))}
          </div>
          <div className="relative mt-1 flex justify-between text-[8px] text-zinc-500">
            <span>↑ High compliance</span>
            <span>Low compliance ↓</span>
          </div>
          <p className="relative mt-2 text-[10px] leading-relaxed text-violet-100/90">
            Only Siren occupies high compliance + continuous monitoring
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">STP Audit</p>
            <div className="space-y-1.5 text-[10px]">
              <p><span className="text-violet-400">S</span> — Medical condition segmentation ✓</p>
              <p><span className="text-violet-400">T</span> — Reposition beyond &apos;400M diabetics&apos;</p>
              <p><span className="text-violet-400">P</span> — Smart-fabric health platform</p>
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Competitive Score</p>
            {[
              { name: "Siren Care", w: 92, c: "#a78bfa" },
              { name: "Podimetrics", w: 74, c: "#818cf8" },
              { name: "Orpyx", w: 61, c: "#6366f1" },
              { name: "Traditional", w: 38, c: "#52525b" },
            ].map((row) => (
              <div key={row.name} className="mb-1.5 flex items-center gap-2">
                <span className="w-[72px] shrink-0 text-[9px] text-zinc-500">{row.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: active ? `${row.w}%` : "6%",
                      background: `linear-gradient(90deg, ${row.c}66, ${row.c})`,
                      boxShadow: `0 0 10px -2px ${row.c}99`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { k: "Strength", v: "68% DFU cut" },
          { k: "Weakness", v: "Single product" },
          { k: "Opportunity", v: "Pre-diabetics" },
          { k: "Threat", v: "Price barrier" },
        ].map((item) => (
          <div key={item.k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2">
            <p className="text-[8px] uppercase tracking-wider text-zinc-600">{item.k}</p>
            <p className="mt-0.5 text-[10px] text-zinc-300">{item.v}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function OlistDashboard({ active, uid }: { active: boolean; uid: string }) {
  const lineId = `olist-line-${uid}`;
  const fillId = `olist-fill-${uid}`;
  const linePoints =
    "0,78 14,72 28,64 42,68 56,52 70,58 84,42 98,48 112,32 126,38 140,24 154,30 168,18 182,22 196,14 200,10";
  const categories = [
    { label: "Health", h: 92, val: "28.4K" },
    { label: "Home", h: 78, val: "22.1K" },
    { label: "Sports", h: 65, val: "18.6K" },
    { label: "Tech", h: 54, val: "15.2K" },
    { label: "Other", h: 41, val: "15.1K" },
  ];

  return (
    <>
      <p className="mb-3 text-center text-[11px] font-medium tracking-wide text-cyan-200/80">
        Olist E-Commerce Analytics Dashboard v1.0
      </p>

      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <KpiCard label="Revenue KPI" value="R$12.4M" sub="▲ 18.2% YoY" accent="#22d3ee" />
        <KpiCard label="Orders" value="99.4K" sub="▲ 12.1%" accent="#22d3ee" />
        <KpiCard label="Avg Ticket" value="R$124" sub="▲ 4.8%" accent="#22d3ee" />
        <KpiCard label="Customers" value="96K" sub="▲ 9.3%" accent="#22d3ee" />
      </div>

      <div className="mb-3 grid gap-2 sm:grid-cols-5">
        <div className="relative overflow-hidden rounded-xl border border-cyan-500/15 bg-black/40 p-3 sm:col-span-3">
          <GridBackdrop />
          <p className="relative mb-1 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Sales Trend · 12 mo</p>
          <svg viewBox="0 0 200 90" className="relative h-32 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(34,211,238,0.4)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </linearGradient>
            </defs>
            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            ))}
            <polyline fill={`url(#${fillId})`} stroke="none" points={`${linePoints} 200,90 0,90`} opacity={active ? 1 : 0.3} />
            <polyline
              fill="none"
              stroke={`url(#${lineId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              points={linePoints}
              style={{
                filter: active ? "drop-shadow(0 0 8px rgba(34,211,238,0.7))" : "none",
                opacity: active ? 1 : 0.35,
              }}
            />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-black/40 p-3 sm:col-span-2">
          <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">On-Time Delivery</p>
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${active ? 92 : 8} 100`}
                style={{ filter: active ? "drop-shadow(0 0 8px rgba(52,211,153,0.75))" : "none" }}
              />
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-semibold text-emerald-300">92%</span>
              <span className="text-[8px] text-zinc-500">SLA met</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-3 rounded-xl border border-indigo-500/15 bg-black/40 p-3">
        <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Orders by Category</p>
        <div className="flex gap-2" style={{ height: 128 }}>
          {categories.map((cat, i) => {
            const barH = active ? Math.max(10, (cat.h / 100) * 100) : 6;
            return (
              <div key={cat.label} className="flex flex-1 flex-col items-center justify-end gap-1" style={{ height: 128 }}>
                <span className="text-[8px] text-cyan-400/70">{cat.val}</span>
                <div
                  className="w-full rounded-t-md transition-all duration-700"
                  style={{
                    height: `${barH}px`,
                    transitionDelay: `${i * 60}ms`,
                    background: "linear-gradient(to top, #4f46e5 0%, #6366f1 45%, #22d3ee 100%)",
                    boxShadow: active ? "0 0 18px -3px rgba(99,102,241,0.7)" : "none",
                  }}
                />
                <span className="text-[8px] text-zinc-600">{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Customer Insights</p>
          <p className="text-[10px] leading-relaxed text-zinc-400">
            High-RFM cohorts drive 34% of revenue from 12% of buyers. Retention focus on Health &amp; Home categories.
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Executive Summary</p>
          <p className="text-[10px] leading-relaxed text-zinc-400">
            Delivery delays correlate with lower review scores — SP &amp; RJ states show highest growth potential.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2 text-[9px] text-zinc-600">
        <span>100K+ records · Python / Pandas</span>
        <span>Data Quality: Excellent</span>
        <span className="flex items-center gap-1 text-emerald-500/80">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          Dashboard Live
        </span>
      </div>
    </>
  );
}

function ProjectDashboard({
  slug,
  active = true,
}: {
  slug: string;
  active?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const tag = slug === "tea-stall" ? "Simulation" : slug === "siren-care" ? "Strategy" : "Analytics";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080a] p-4 text-white md:p-5">
      <DashboardHeader tag={tag} />
      {slug === "tea-stall" && <TeaStallDashboard active={active} uid={uid} />}
      {slug === "siren-care" && <SirenCareDashboard active={active} uid={uid} />}
      {slug === "olist" && <OlistDashboard active={active} uid={uid} />}
    </div>
  );
}

export function ProjectDetailVisuals({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const glow = glowBySlug[project.slug] ?? "#71717a";

  return (
    <div ref={ref} className="mb-16">
      <TiltGlowPanel glow={glow} className="rounded-2xl border border-white/[0.08] bg-[#08080a] p-1 text-white md:p-1">
        <ProjectDashboard slug={project.slug} active={inView} />
      </TiltGlowPanel>
    </div>
  );
}

export function ProjectPreviewVisual({
  slug,
  active = true,
}: {
  slug: string;
  active?: boolean;
}) {
  return <ProjectDashboard slug={slug} active={active} />;
}

export { ProjectDashboard };
