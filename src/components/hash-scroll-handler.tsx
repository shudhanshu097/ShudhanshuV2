"use client";

import { useEffect } from "react";
import { useLenis, useScrollToSection } from "@/components/smooth-scroll";

export function HashScrollHandler() {
  const scrollTo = useScrollToSection();
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const run = () => scrollTo(hash);
    const timer = window.setTimeout(run, lenis ? 80 : 320);

    return () => window.clearTimeout(timer);
  }, [scrollTo, lenis]);

  return null;
}
