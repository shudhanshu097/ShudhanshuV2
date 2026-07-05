"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";

export function ProjectRoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const warm = () => {
      router.prefetch("/");
      projects.forEach((p) => router.prefetch(`/projects/${p.slug}`));
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(warm, 600);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
