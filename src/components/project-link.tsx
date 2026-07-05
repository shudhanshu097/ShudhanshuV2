"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, type ReactNode } from "react";
import { assetPath, hasBasePath, routePath } from "@/lib/asset-path";

type ProjectLinkProps = LinkProps & {
  className?: string;
  children?: ReactNode;
};

function resolveHref(href: LinkProps["href"]) {
  if (typeof href === "string") {
    const [path, query] = href.split("?");
    const normalized = path.endsWith("/") ? path : `${path}/`;
    return query ? `${routePath(normalized)}?${query}` : routePath(normalized);
  }

  if (href && typeof href === "object" && typeof href.pathname === "string") {
    const path = href.pathname.endsWith("/")
      ? href.pathname
      : `${href.pathname}/`;
    const query = href.search ?? "";
    return `${routePath(path)}${query}`;
  }

  return href;
}

export function ProjectLink({ href, children, ...props }: ProjectLinkProps) {
  const router = useRouter();
  const resolved = resolveHref(href);
  const path =
    typeof href === "string"
      ? href.split("?")[0]
      : typeof href === "object" && href && typeof href.pathname === "string"
        ? href.pathname
        : "";

  const warm = useCallback(() => {
    if (path) router.prefetch(routePath(path.endsWith("/") ? path : `${path}/`));
  }, [router, path]);

  if (hasBasePath && typeof resolved === "string") {
    return (
      <a
        href={resolved}
        onPointerEnter={warm}
        onFocus={warm}
        className={props.className}
      >
        {children}
      </a>
    );
  }

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
