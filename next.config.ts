import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add the images configuration block here
  images: {
    // remotePatterns allows us to define which external domains are allowed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Allow any path under this hostname
      },
    ],
  },
};

export default nextConfig;
