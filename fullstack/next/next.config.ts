import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Cambiar a false mejora el rendimiento en desarrollo
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
    minimumCacheTTL: 60, // Aumenta la caché de imágenes
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500, // Reducido para respuesta más rápida
        aggregateTimeout: 200, // Reducido para compilación más rápida
        ignored: ['node_modules/**'],
      };
    }
    
    if (!isServer) {
      // Optimizaciones para el navegador
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
    // Permitir suspense para streaming
    serverActions: {},
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  staticPageGenerationTimeout: 180, // Aumentado para permitir cargas más grandes
  compress: true, // Asegura que la compresión esté activada
  productionBrowserSourceMaps: false, // Desactivar en producción para mejorar rendimiento
  swcMinify: true, // Usar SWC para minificación
  poweredByHeader: false,
};

export default nextConfig;