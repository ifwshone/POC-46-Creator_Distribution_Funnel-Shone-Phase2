import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
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

  // Lets a phone on the same Wi-Fi load the dev server. Without this, Next.js
  // blocks its own scripts for any non-localhost host, so the page shows but
  // nothing is interactive and the chart never draws.
  // Add your PC's exact IP if the wildcard line doesn't cover your network.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
    // "192.168.1.23",   // <- your PC's IP, if needed
  ],
};

export default nextConfig;