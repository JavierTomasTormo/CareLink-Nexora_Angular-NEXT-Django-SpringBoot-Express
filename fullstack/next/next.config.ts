import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 500,
      };
    }
    return config;
  },
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        "*.js": ["swc-loader"]
      },
    },
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  staticPageGenerationTimeout: 120,
  async redirects() {
    return [];
  },
  poweredByHeader: false,
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['picsum.photos'],
//   },
//   webpack: (config, { dev, isServer }) => {
//     if (dev && !isServer) {
//       config.watchOptions = {
//         poll: 800,
//         aggregateTimeout: 300,
//       };
//     }
//     return config;
//   },
// };

// export default nextConfig;