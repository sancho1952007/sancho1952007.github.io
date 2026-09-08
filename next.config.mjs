/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {
    root: import.meta.dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
