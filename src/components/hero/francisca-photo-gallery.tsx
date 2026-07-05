"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/smooth-scroll";
import { siteConfig } from "@/data/projects";
import { cn } from "@/lib/utils";

export function FranciscaPhotoGallery() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el || reducedMotion) return;

    let rafId = 0;
    let lastScroll = -1;

    const applyParallax = (scroll: number) => {
      if (Math.abs(scroll - lastScroll) < 0.5) return;
      lastScroll = scroll;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = Math.min(80, Math.max(0, (scroll / 600) * 80));
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    if (lenis) {
      applyParallax(lenis.scroll);
      return lenis.on("scroll", (instance) => applyParallax(instance.scroll));
    }

    const onNativeScroll = () => applyParallax(window.scrollY);
    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      cancelAnimationFrame(rafId);
    };
  }, [lenis, reducedMotion]);

  const photos = siteConfig.photos;
  const photoCount = photos.length;
  const loop = [...photos, ...photos, ...photos];

  return (
    <div ref={parallaxRef} className="gpu-layer relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <div className="overflow-hidden py-4">
        <div
          className={cn(
            "flex w-max gap-5 md:gap-8",
            !reducedMotion && "animate-francisca-drift",
            paused && !reducedMotion && "[animation-play-state:paused]"
          )}
        >
          {loop.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className={cn(
                "gallery-figure relative shrink-0 overflow-hidden",
                "h-[42vh] min-h-[240px] w-[38vw] max-w-[280px] min-w-[160px]",
                "md:h-[52vh] md:max-w-[320px]",
                i % 2 === 1 && "mt-8 md:mt-12"
              )}
            >
              <Image
                src={src}
                alt={`Gallery ${(i % photoCount) + 1}`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 40vw, 320px"
                priority={i < photoCount}
                loading={i < photoCount ? undefined : "lazy"}
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </div>
  );
}
