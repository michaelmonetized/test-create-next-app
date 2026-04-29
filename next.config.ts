/**
 * Next.config public module surface.
 */
import path from "node:path";
import type { NextConfig } from "next";

const projectSlug = path
  .basename(process.cwd())
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

const projectHost = `${projectSlug}.localhost`;

const nextConfig: NextConfig = {
  reactCompiler: process.env.REACT_COMPILER !== "false",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placecats.com",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [projectHost, "*.localhost"],
};

export default nextConfig;
