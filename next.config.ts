import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Use the stable TypeScript compiler API. The CLI preview path can lose
  // captured output under Node 24, which makes Next misread `--showConfig`.
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
