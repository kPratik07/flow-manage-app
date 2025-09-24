/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore type errors for deployment
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
