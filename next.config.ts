import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
