// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Включаем серверный режим, ONREZA сама настроит сборку
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  }
});