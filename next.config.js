/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages project deployment at ABHAY200.github.io/vylor
  basePath: '/vylor',
}

module.exports = nextConfig

