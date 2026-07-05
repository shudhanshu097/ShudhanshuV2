"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, type ReactNode } from "react";

type ProjectLinkProps = LinkProps & {
  className?: string;
  children?: ReactNode;
};

export function ProjectLink({ href, children, ...props }: ProjectLinkProps) {
  const router = useRouter();
  const path =
    typeof href === "string"
      ? href.split("?")[0]
      : typeof href.pathname === "string"
        ? href.pathname
        : "";

  const warm = useCallback(() => {
    if (path) router.prefetch(path);
  }, [router, path]);

  return (
    <Link
      href={href}
      prefetch
      onPointerEnter={warm}
      onFocus={warm}
      {...props}
    >
      {children}
    </Link>
  );
}
