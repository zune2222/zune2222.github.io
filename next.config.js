const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  basePath: "",
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = withContentlayer(nextConfig);
