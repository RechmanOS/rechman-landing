// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node'; // Добавляем адаптер для Node.js

// https://astro.build/config
export default defineConfig({
  // Включаем серверный рендеринг для работы API
  output: 'server',
  
  // Подключаем адаптер Node.js в режиме standalone
  adapter: node({
    mode: 'standalone',
  }),

  vite: {
    plugins: [tailwindcss()]
  }
});