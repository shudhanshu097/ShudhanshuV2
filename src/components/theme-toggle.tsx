"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const THEME_TRANSITION_MS = 750;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme(theme === "dark" ? "light" : "dark");
    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, THEME_TRANSITION_MS);
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "theme-toggle gpu-layer fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs tracking-wide",
        "border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
        "hover:text-[var(--text)]"
      )}
      aria-label="Toggle dark or light mode"
    >
      <span className="text-sm transition-transform duration-500 ease-out">
        {theme === "dark" ? "☾" : "☀"}
      </span>
      <span>{theme === "dark" ? "Dark" : "Cream"}</span>
    </button>
  );
}
