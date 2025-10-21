import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to support Server Actions for Admin CRUD
  // This project should be deployed on Vercel or similar Node.js platform
  images: {
    unoptimized: true
  },
};

export default nextConfig;
