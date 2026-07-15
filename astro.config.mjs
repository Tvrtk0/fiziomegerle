// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Deployed as a GitHub Pages project site: https://tvrtk0.github.io/fiziomegerle/
  site: 'https://tvrtk0.github.io',
  base: '/fiziomegerle',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
