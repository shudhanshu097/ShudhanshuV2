"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { routePath } from "@/lib/asset-path";

export function ProjectRoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const warm = () => {
      router.prefetch(routePath("/"));
      projects.forEach((p) => router.prefetch(routePath(`/projects/${p.slug}/`)));
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
