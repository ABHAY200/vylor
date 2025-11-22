/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages project deployment at ABHAY200.github.io/vylor
  // Only apply basePath in production (when building for GitHub Pages)
  basePath: isProd ? '/vylor' : '',
  // Skip trailing slash to avoid issues with GitHub Pages
  trailingSlash: true,
  // Make the basePath available to the app
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/vylor' : '',
  },
}

module.exports = nextConfig

