/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // No basePath needed for custom domain (vylor.in)
  // basePath is only needed for username.github.io/repo-name deployments
  trailingSlash: true,
}

module.exports = nextConfig

