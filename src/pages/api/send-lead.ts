// @ts-nocheck
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, contact, company } = body;

    // Берем токен из переменных окружения (Astro)
    const TG_TOKEN = import.meta.env.TG_TOKEN;
    const TG_CHAT_ID = import.meta.env.TG_CHAT_ID;

    if (!TG_TOKEN || !TG_CHAT_ID) {
      console.error('ОШИБКА: Переменные TG_TOKEN или TG_CHAT_ID не найдены!');
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