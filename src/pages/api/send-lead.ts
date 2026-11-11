// @ts-nocheck
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, contact, company } = body;

    // Берем данные из системного окружения сервера ONREZA
    const TG_TOKEN = process.env.TG_TOKEN;
    const TG_CHAT_ID = process.env.TG_CHAT_ID;

    if (!TG_TOKEN || !TG_CHAT_ID) {
      console.error('Переменные окружения не найдены!');
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
      const errorData = await response.json();
      console.error('Ошибка Telegram:', errorData);
      throw new Error('Telegram API error');
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Общая ошибка:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка' }), { status: 500 });
  }
};