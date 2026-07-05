"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routePath } from "@/lib/asset-path";

export function RedirectToHash({ hash }: { hash: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${routePath("/")}#${hash}`);
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timer);
  }, [hash, router]);

  return null;
}
