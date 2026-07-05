const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

export function routePath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

export function isHomePath(pathname: string) {
  if (pathname === "/") return true;
  if (!basePath) return false;
  return pathname === basePath || pathname === `${basePath}/`;
}

export const hasBasePath = Boolean(basePath);
