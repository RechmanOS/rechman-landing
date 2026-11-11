import type { APIRoute } from 'astro';

// Эта функция срабатывает, когда кто-то отправляет POST-запрос на /api/send-lead
export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Получаем данные из формы, которую отправил пользователь
    const body = await request.json();
    const { name, contact, company } = body;

    // 2. Берем секретный токен из переменных окружения ONREZA (мы настроим их на следующем шаге)
    // ВАЖНО: Мы используем import.meta.env, чтобы получить доступ к переменным
    const TG_TOKEN = import.meta.env.TG_TOKEN;
    const TG_CHAT_ID = import.meta.env.TG_CHAT_ID;

    if (!TG_TOKEN || !TG_CHAT_ID) {
      return new Response(JSON.stringify({ error: 'Секретные данные не настроены на сервере' }), { status: 500 });
    }

    // 3. Формируем красивое сообщение
    const message = `🔥 <b>Новая заявка с сайта!</b>\n\n👤 <b>Имя:</b> ${name}\n📞 <b>Контакт:</b> ${contact}\n🏢 <b>Компания:</b> ${company || 'Не указана'}`;

    // 4. Отправляем запрос в Telegram
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
      throw new Error('Telegram API ответил ошибкой');
    }

    // 5. Если всё хорошо, сообщаем об успехе
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('Ошибка при отправке:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), { status: 500 });
  }
};