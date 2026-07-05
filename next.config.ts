import type { NextConfig } from "next";

const githubRepo = "ShudhanshuV2";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${githubRepo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080],
    imageSizes: [256, 320, 384],
  },
};

export default nextConfig;
