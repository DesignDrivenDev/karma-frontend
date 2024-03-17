/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ['ssl.cdn-redfin.com','s3.amazonaws.com' ]
  }
}

module.exports = nextConfig
