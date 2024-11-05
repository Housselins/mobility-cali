import i18nConfig from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    coreApi: process.env.API_CORE,
  },
  ...i18nConfig,
  async rewrites() {
    return [
      {
        source: '/api/llm/:path*',
        destination: 'https://usellm.org/api/llm/:path*', // Redirige a la URL de la API externa
      },
    ];
  },
};

export default nextConfig;
