import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // output: "export", // เพิ่มบรรทัดนี้
  trailingSlash: true,
};

export default nextConfig;
