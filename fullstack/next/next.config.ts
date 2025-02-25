import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '**',
      }
    ],
    minimumCacheTTL: 60, 
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500, 
        aggregateTimeout: 200, 
        ignored: ['node_modules/**'],
      };
    }
    
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
        },
      };
    }
    
    return config;
  },
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        "*.js": ["swc-loader"]
      },
    },
    serverActions: {},
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  staticPageGenerationTimeout: 180,
  compress: true, 
  productionBrowserSourceMaps: false, 
  swcMinify: true, 
  poweredByHeader: false,
};

export default nextConfig;