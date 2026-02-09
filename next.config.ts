import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns:[new URL('https://fggbkgxkjxauuxemymph.supabase.co/storage/v1/object/public/valentine-images/**')]
  },
  async redirects(){
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
