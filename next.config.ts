import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
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
