/**
 * next.config.js – minimal configuration for the portfolio.
 * Uses the App Router (app/ directory) and enables strict mode.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure the app directory is used (default in Next 13+)
  // No additional rewrites or redirects at this phase.
};

module.exports = nextConfig;
