import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};
export default nextConfig;
