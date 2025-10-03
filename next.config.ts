import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.pixabay.com', // 🛑 Add the hostname here
      // Include any other external domains you use (e.g., 'images.unsplash.com')
      'pixabay.com',
    ],
  },
  /* config options here */
};

export default nextConfig;
