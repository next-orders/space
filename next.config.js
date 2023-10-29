/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["v1.next-orders.org"],
  },
  output: "standalone",
};

module.exports = nextConfig;
