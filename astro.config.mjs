// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', // Включаем серверный рендеринг
  adapter: node({
    mode: 'standalone', // Этот режим подходит для платформ вроде ONREZA
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});