import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  allowedDevOrigins: ["192.168.0.14"],

  /* config options here */
  cacheComponents: false,
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
