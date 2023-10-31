/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // What if we don't know prod hostname?
      {
        protocol: "https",
        hostname: "**.org",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
