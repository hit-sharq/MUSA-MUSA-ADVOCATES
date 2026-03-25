/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com', 'images.clerk.dev'],
  },
  async headers() {
    return [
      {
        source: '/((?!api|admin).*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'Cache-Control', value: 'public, s-maxage=3600, max-age=300' },
          { key: 'Vary', value: 'Accept-Encoding, User-Agent' },
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;
