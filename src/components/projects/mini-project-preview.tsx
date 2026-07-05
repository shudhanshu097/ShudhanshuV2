"use client";

const accentBySlug: Record<string, string> = {
  "tea-stall": "#f59e0b",
  "siren-care": "#8b5cf6",
  olist: "#22d3ee",
};

function GhostKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
      <p className="text-[8px] uppercase tracking-wider text-zinc-600">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-zinc-500">{value}</p>
    </div>
  );
}

function TeaStallMini({ accent }: { accent: string }) {
  const bars = [40, 55, 48, 72, 65, 88, 58, 76, 52, 68];
  return (
    <>
      <div className="mb-2 grid grid-cols-2 gap-1.5">
        <GhostKpi label="Revenue" value="₹4,735" />
        <GhostKpi label="Customers" value="135" />
      </div>
      <div className="flex h-16 items-end gap-0.5 rounded-lg border border-white/[0.04] bg-black/30 px-2 pb-2 pt-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[2px]"
            style={{
              height: `${h * 0.55}%`,
              background: `linear-gradient(to top, ${accent}44, ${accent}18)`,
            }}
          />
        ))}
      </div>
    </>
  );
}

function SirenCareMini({ accent }: { accent: string }) {
  return (
    <>
      <div className="mb-2 grid grid-cols-2 gap-1.5">
        <GhostKpi label="DFU Risk" value="68%" />
        <GhostKpi label="Diabetics" value="853M" />
      </div>
      <div className="grid h-16 grid-cols-2 grid-rows-2 gap-1 rounded-lg border border-white/[0.04] bg-black/30 p-1.5">
        {[0, 1, 2, 3].map((cell) => (
          <div
            key={cell}
            className="rounded-[3px]"
            style={{
              background:
                cell === 3
                  ? `linear-gradient(135deg, ${accent}33, ${accent}11)`
                  : "rgba(255,255,255,0.02)",
              border: cell === 3 ? `1px solid ${accent}44` : "1px solid rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </div>
    </>
  );
}

function OlistMini({ accent }: { accent: string }) {
  return (
    <>
      <div className="mb-2 grid grid-cols-2 gap-1.5">
        <GhostKpi label="Orders" value="99.4K" />
        <GhostKpi label="Revenue" value="R$12.4M" />
      </div>
      <div className="relative h-16 overflow-hidden rounded-lg border border-white/[0.04] bg-black/30">
        <svg viewBox="0 0 120 40" className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeOpacity="0.45"
            points="0,32 15,28 30,24 45,26 60,18 75,20 90,14 105,16 120,10"
          />
        </svg>
        <div className="absolute bottom-2 left-2 right-2 flex items-end gap-0.5">
          {[70, 55, 48, 38].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[2px]"
              style={{
                height: `${h * 0.22}px`,
                background: `linear-gradient(to top, ${accent}55, ${accent}22)`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function MiniProjectPreview({ slug }: { slug: string }) {
  const accent = accentBySlug[slug] ?? "#71717a";
  const tag =
    slug === "tea-stall" ? "Simulation" : slug === "siren-care" ? "Strategy" : "Analytics";

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0c]/80 p-3 opacity-90">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-wider text-zinc-600">{tag} preview</span>
        <span className="h-1 w-1 rounded-full bg-emerald-500/40" />
      </div>
      {slug === "tea-stall" && <TeaStallMini accent={accent} />}
      {slug === "siren-care" && <SirenCareMini accent={accent} />}
      {slug === "olist" && <OlistMini accent={accent} />}
    </div>
  );
}
