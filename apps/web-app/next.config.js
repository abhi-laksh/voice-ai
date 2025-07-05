/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    dirs: ['src']
  },
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    serverComponentsExternalPackages: []
  }
}

module.exports = nextConfig