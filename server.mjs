import { handler } from './dist/server/entry.mjs';
import http from 'node:http';

// Берем порт, который передает ONREZA, или ставим 4321 по умолчанию
const port = process.env.PORT || 4321; 
// Принудительно слушаем все интерфейсы (0.0.0.0)
const host = process.env.HOST || '0.0.0.0';

const server = http.createServer((req, res) => {
  handler(req, res);
});

server.listen(port, host, () => {
  console.log(`Сервер успешно запущен на http://${host}:${port}`);
});