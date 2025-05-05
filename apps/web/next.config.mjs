/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@mm-app/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "cdn.simpleicons.org",
        protocol: "https",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "service-hosted-files.tbdh.dev",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;
