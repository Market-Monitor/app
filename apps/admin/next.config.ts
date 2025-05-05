/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@mm-app/ui", "@mm-app/auth"],
  images: {
    remotePatterns: [
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
