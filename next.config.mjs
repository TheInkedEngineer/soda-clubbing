/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow running both Next and existing Vite code during transition
  typedRoutes: false,
  // Expose public env vars and maintain backward-compat with Vite-style names
  env: {
    NEXT_PUBLIC_STORE_DOMAIN: process.env.NEXT_PUBLIC_STORE_DOMAIN ?? process.env.VITE_PUBLIC_STORE_DOMAIN,
    NEXT_PUBLIC_STOREFRONT_API_TOKEN:
      process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN ?? process.env.VITE_PUBLIC_STOREFRONT_API_TOKEN,
  },
};
export default nextConfig;
