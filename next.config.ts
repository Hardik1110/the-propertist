import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
  allowedDevOrigins: ["192.168.29.132"],
};

export default nextConfig;
