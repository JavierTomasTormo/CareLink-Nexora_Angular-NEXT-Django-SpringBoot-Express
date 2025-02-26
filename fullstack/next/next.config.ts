import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'picsum.photos',
      'cdn-icons-png.flaticon.com',
      'cdn-icons-png.freepik.com',
      'www.suacasa.es',
      'www.eninter.com',
      'media.licdn.com',
      'personaswip.com',
      '',
      '',
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.next', '**/out', '**/.git'],
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;