import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgfp.hotp.jp"
      },
      {
        protocol: "http",
        hostname: "webservice.recruit.co.jp"
      }
    ]
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
