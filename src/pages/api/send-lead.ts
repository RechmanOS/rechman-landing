// @ts-nocheck
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, contact, company } = body;

    const TG_TOKEN = process.env.TG_TOKEN;
    const TG_CHAT_ID = process.env.TG_CHAT_ID;

    if (!TG_TOKEN || !TG_CHAT_ID) {
      // Возвращаем понятную ошибку, если переменных нет
      return new Response(JSON.stringify({ error: 'ONREZA не передала переменные TG_TOKEN или TG_CHAT_ID' }), { status: 500 });
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
      const tgError = await response.text();
      return new Response(JSON.stringify({ error: `Ошибка Telegram: ${tgError}` }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Ошибка сервера: ${error.message}` }), { status: 500 });
  }
};