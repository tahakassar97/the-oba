import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ghazalim.atconcept.tech',
        pathname: '/uploads/**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin/orders',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
