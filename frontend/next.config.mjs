/** @type {import('next').NextConfig} */

const nextConfig = {

  images: {
    remotePatterns: [

      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },

      // Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },

    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;