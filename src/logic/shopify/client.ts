import { createStorefrontClient } from '@shopify/hydrogen-react';

const storeDomain =
  process.env.NEXT_PUBLIC_STORE_DOMAIN ?? process.env.VITE_PUBLIC_STORE_DOMAIN ?? '';
const publicStorefrontToken =
  process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN ?? process.env.VITE_PUBLIC_STOREFRONT_API_TOKEN ?? '';
// Do not expose private token on client; this is only available on the server
const privateStorefrontToken = process.env.PRIVATE_STOREFRONT_API_TOKEN ?? process.env.VITE_PRIVATE_STOREFRONT_API_TOKEN;

export const client = createStorefrontClient({
  storeDomain,
  publicStorefrontToken,
  privateStorefrontToken,
});
