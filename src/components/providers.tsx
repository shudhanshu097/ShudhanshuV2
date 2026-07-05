"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { DockNav } from "@/components/nav/dock-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { GrainOverlay } from "@/components/grain-overlay";
import { ProjectRoutePrefetch } from "@/components/project-route-prefetch";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
      <SmoothScroll>
        <ProjectRoutePrefetch />
        <GrainOverlay />
        <ThemeToggle />
        <DockNav />
        {children}
      </SmoothScroll>
    </NextThemesProvider>
  );
}
