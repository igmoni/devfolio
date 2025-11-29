/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      }
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
