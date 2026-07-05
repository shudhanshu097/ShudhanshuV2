"use client";

import { hasBasePath, routePath } from "@/lib/asset-path";

type HomeSectionLinkProps = {
  section: string;
  className?: string;
  children: React.ReactNode;
};

export function HomeSectionLink({
  section,
  className,
  children,
}: HomeSectionLinkProps) {
  const href = `${routePath("/")}#${section}`;

  if (hasBasePath) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
