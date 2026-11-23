import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve AVIF/WebP at responsive sizes (handled by Netlify Image CDN in production).
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    // Tree-shake icon & 3D libraries so each page only ships what it uses.
    optimizePackageImports: ["lucide-react", "three", "@react-three/fiber"],
  },
};

export default nextConfig;
