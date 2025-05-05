import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.myappspace.net/v1/user/:path*",
      },
    ];
  },
};

export default nextConfig;
