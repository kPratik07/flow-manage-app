import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Skip linting during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
