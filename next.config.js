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
      {
        protocol: 'https',
        hostname: 'gatica.sirv.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig
