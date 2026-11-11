// @ts-nocheck
import type { APIRoute } from 'astro';

// 👇 ВСТАВЬТЕ СЮДА ВАШ URL ОТ CLOUDFLARE WORKER
const WORKER_URL = 'https://rechman-form-proxy.factoryproject2021.workers.dev';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, contact, company } = body;

    // Отправляем запрос на наш Cloudflare Worker
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, company })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка от Worker:', errorData);
      throw new Error('Worker error');
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка' }), { status: 500 });
  }
};