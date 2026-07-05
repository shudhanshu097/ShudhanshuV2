"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

export const motionEase = [0.22, 1, 0.36, 1] as const;

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      lerp: 0.082,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.15,
      infinite: false,
      autoRaf: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    const onResize = () => instance.resize();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <RouteScrollSync lenis={lenis} />
      {children}
    </LenisContext.Provider>
  );
}

function RouteScrollSync({ lenis }: { lenis: Lenis | null }) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    if (!lenis) return;

    lenis.resize();

    if (!bootstrappedRef.current) {
      bootstrappedRef.current = true;
      pathnameRef.current = pathname;
      return;
    }

    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;

    requestAnimationFrame(() => {
      lenis.scrollTo(0, {
        immediate: pathname.startsWith("/projects/"),
        duration: pathname.startsWith("/projects/") ? 0 : 0.28,
        force: true,
      });
      lenis.resize();
    });
  }, [pathname, lenis]);

  return null;
}

export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -20, duration: 0.72, force: true });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis]
  );
}
