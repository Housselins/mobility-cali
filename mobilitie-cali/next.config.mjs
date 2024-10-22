import i18nConfig from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    coreApi: process.env.API_CORE,
  },
  ...i18nConfig,
};

export default nextConfig;
