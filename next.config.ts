import type { NextConfig } from "next";

// Landing page is served at https://gluon.stability.nexus/ (root).
// Use empty basePath for root deployment; set NEXT_PUBLIC_BASE_PATH for subpath deployment.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath.replace(/^\/+|\/+$/g, ""); // strip leading and trailing slashes
const nextBasePath = basePath ? `/${basePath}` : "";
const nextAssetPrefix = basePath ? `/${basePath}/` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: nextBasePath,
  ...(nextAssetPrefix && { assetPrefix: nextAssetPrefix }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
