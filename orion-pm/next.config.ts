import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.boringavatars.com",
      },
    ],
  },
};

export default nextConfig;
