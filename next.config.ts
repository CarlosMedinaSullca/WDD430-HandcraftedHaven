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
  images: {
    domains: [
      'cdn.pixabay.com', // ⬅️ Add this domain
      // 'other-allowed-domain.com', // Add other external domains here if needed
      'pixabay.com',
    ],
  },
};

export default nextConfig;
