import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ message: "Pong! API работает" }), { status: 200 });
};

export const POST: APIRoute = () => {
  return new Response(JSON.stringify({ message: "Pong! POST-запрос работает" }), { status: 200 });
};