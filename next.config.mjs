/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://52.220.93.185/api/:path*',
      },
      {
        source: '/ai/:path*',
        destination: 'http://52.220.93.185/ai/:path*',
      },
    ]
  },
}

export default nextConfig
