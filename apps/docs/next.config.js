/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Pin the workspace root so Turbopack doesn't infer a stray parent lockfile.
    root: path.join(__dirname, "..", ".."),
  },
};

module.exports = nextConfig;
