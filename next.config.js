/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ezegatica.com',
        port: '',
        pathname: '/assets/images/**',
      },
    ],
  }
}

module.exports = nextConfig
