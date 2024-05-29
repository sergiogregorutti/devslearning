/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devslearning.s3.us-east-2.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
