import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  // output: isDev ? 'server' : 'static',
  integrations: [tailwind(), react()],
});
