/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enable type checking for production
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checking for production
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

module.exports = nextConfig;
