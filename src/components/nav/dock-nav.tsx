"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollToSection } from "@/components/smooth-scroll";
import { isHomePath, routePath } from "@/lib/asset-path";
import { siteConfig } from "@/data/projects";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "leadership", label: "Lead" },
  { id: "contact", label: "Contact" },
] as const;

export function DockNav() {
  const pathname = usePathname();
  const scrollTo = useScrollToSection();
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>("home");
  const onHome = isHomePath(pathname);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("nav-hidden");
    if (stored === "true") setHidden(true);
  }, []);

  useEffect(() => {
    if (!onHome) return;

    let rafId = 0;
    let pendingActive: string | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        pendingActive = visible.target.id;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (pendingActive) setActive(pendingActive);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [onHome]);

  const navigate = useCallback(
    (id: string) => {
      if (onHome) {
        scrollTo(id);
        return;
      }
      window.location.href = `${routePath("/")}#${id}`;
    },
    [onHome, scrollTo]
  );

  const toggle = useCallback(() => {
    setHidden((prev) => {
      const next = !prev;
      localStorage.setItem("nav-hidden", String(next));
      return next;
    });
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {!hidden && (
          <motion.nav
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className={cn(
              "fixed left-0 top-0 z-40 flex h-full w-16 flex-col items-center",
              "border-r border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md"
            )}
          >
            <button
              type="button"
              onClick={() => navigate("home")}
              className="mt-5 shrink-0 overflow-hidden rounded-full border border-[var(--border)] transition-transform hover:scale-105"
              aria-label="Go to home"
            >
              <Image
                src={siteConfig.avatar}
                alt={siteConfig.name}
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
            </button>

            <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
              {sections.map(({ id, label }) => {
                const isActive = onHome ? active === id : false;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigate(id)}
                    className={cn(
                      "group relative flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em]",
                      isActive
                        ? "text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full transition-transform group-hover:scale-150",
                        isActive ? "bg-[var(--text)]" : "bg-transparent"
                      )}
                    />
                    <span className="[writing-mode:vertical-rl] rotate-180">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={toggle}
              className="mb-6 text-[10px] uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              Hide
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hidden && (
          <motion.button
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            type="button"
            onClick={toggle}
            className={cn(
              "fixed left-4 bottom-6 z-40 rounded-full border px-4 py-2 text-xs",
              "border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
              "hover:text-[var(--text)] transition-colors"
            )}
          >
            ☰ Menu
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
