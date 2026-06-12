import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/tjanster",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/tjanster/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
