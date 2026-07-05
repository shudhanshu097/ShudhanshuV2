"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis, motionEase } from "@/components/smooth-scroll";

const WIPE_MS = 460;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();
  const [wipe, setWipe] = useState(false);
  const prevPath = useRef(pathname);

  const fromWork =
    searchParams.get("from") === "work" && pathname.startsWith("/projects/");
  const isProjectRoute = pathname.startsWith("/projects/");
  const routeChanged = prevPath.current !== pathname;

  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (fromWork) {
      setWipe(true);
      const timer = window.setTimeout(() => {
        setWipe(false);
        lenis?.resize();
      }, WIPE_MS);
      return () => clearTimeout(timer);
    }
    setWipe(false);
  }, [fromWork, pathname, lenis]);

  return (
    <>
      <AnimatePresence mode="sync">
        {wipe && (
          <motion.div
            key="wipe-layer"
            initial={{ x: "-105%" }}
            animate={{ x: "105%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.44, ease: motionEase }}
            className="gpu-layer pointer-events-none fixed inset-0 z-[60] bg-[var(--bg-surface)] will-change-transform"
            style={{ clipPath: "ellipse(90% 130% at 50% 50%)" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="sync">
        {wipe && (
          <motion.div
            key="wipe-accent"
            initial={{ x: "-110%", opacity: 0.6 }}
            animate={{ x: "110%", opacity: 0 }}
            transition={{ duration: 0.46, ease: motionEase, delay: 0.03 }}
            className="gpu-layer pointer-events-none fixed inset-0 z-[61] bg-[var(--text)]/10 will-change-transform"
            style={{ clipPath: "ellipse(70% 100% at 50% 50%)" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={
          routeChanged
            ? {
                opacity: 0,
                y: isProjectRoute ? 22 : 12,
              }
            : false
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: isProjectRoute ? 0.42 : 0.34,
          delay: fromWork ? 0.08 : 0,
          ease: motionEase,
        }}
        className="gpu-layer"
      >
        {children}
      </motion.div>
    </>
  );
}
