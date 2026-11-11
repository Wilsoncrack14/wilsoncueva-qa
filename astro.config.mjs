import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://wilsoncueva-qa.vercel.app',
  integrations: [tailwind(), react()],
});
