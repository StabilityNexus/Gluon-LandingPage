import type { NextConfig } from "next";

const repoName = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\//, "") ?? "Gluon-LandingPage";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
