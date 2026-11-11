// @ts-nocheck
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // --- БЛОК ОТЛАДКИ ---
  console.log('--- НАЧАЛО ОБРАБОТКИ ЗАПРОСА ---');
  console.log('Доступные переменные окружения (process.env):', {
    TG_TOKEN: !!process.env.TG_TOKEN,
    TG_CHAT_ID: !!process.env.TG_CHAT_ID,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
  });
  // --------------------

  try {
    const body = await request.json();
    const { name, contact, company } = body;

    const TG_TOKEN = process.env.TG_TOKEN;
    const TG_CHAT_ID = process.env.TG_CHAT_ID;

    if (!TG_TOKEN || !TG_CHAT_ID) {
      console.error('КРИТИЧЕСКАЯ ОШИБКА: Переменные TG_TOKEN или TG_CHAT_ID не найдены в process.env!');
      return new Response(JSON.stringify({ error: 'Секретные данные не настроены' }), { status: 500 });
    }

    const message = `🔥 <b>Новая заявка с сайта!</b>\n\n👤 <b>Имя:</b> ${name}\n📞 <b>Контакт:</b> ${contact}\n🏢 <b>Компания:</b> ${company || 'Не указана'}`;

    const response = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      console.error('ОШИБКА TELEGRAM API:', await response.text());
      throw new Error('Telegram API error');
    }

    console.log('УСПЕХ: Заявка отправлена в Telegram');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('ОШИБКА СЕРВЕРА:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка' }), { status: 500 });
  }
};