import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typedRoutes: true,
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      fflate: "fflate/esm/browser.js",
      jspdf: "jspdf/dist/jspdf.es.min.js",
    },
  },
};

export default nextConfig;
