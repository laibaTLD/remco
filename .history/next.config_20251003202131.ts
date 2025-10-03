/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for SSG + ISR (no output: 'export' to keep ISR functionality)
  // Disable output file tracing to avoid Windows permission issues with .next/trace
  outputFileTracing: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any host
      },
    ],
    qualities: [75, 85, 90, 95, 100], // Configure allowed quality values
  },
  // Enable experimental features for better performance
  experimental: {
    ppr: false, // Keep false for stability
  },
  // Configure for optimal SSG + ISR
  async rewrites() {
    return [];
  },
  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
