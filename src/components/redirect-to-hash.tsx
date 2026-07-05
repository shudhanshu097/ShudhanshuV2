"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RedirectToHash({ hash }: { hash: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/#${hash}`);
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timer);
  }, [hash, router]);

  return null;
}
