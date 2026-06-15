/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    allowedOrigins: ['192.168.1.7'],
  },
  // In newer Next.js versions it might be at root level:
  allowedDevOrigins: ['192.168.1.7']
};

export default nextConfig;
