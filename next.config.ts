/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },

  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;