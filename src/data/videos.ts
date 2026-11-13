// src/data/videos.ts

export interface VideoComment {
  author: string;
  text: string;
}

export interface VideoItem {
  id: number;
  src: string;
  poster?: string;
  title: string;
  description: string;
  comments: VideoComment[];
  docsAnchor?: string;
}

// Генерируем 21 тестовый ролик. 
// ВАЖНО: Сейчас все ролики ссылаются на файл со звуком '/videos/hero_sound.mp4'
export const videos: VideoItem[] = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  src: '/videos/hero_sound.mp4', // <--- ПУТЬ К НОВОМУ ВИДЕО СО ЗВУКОМ
  poster: '', 
  title: `Ролик ${i + 1}`,
  description: 'Здесь будет краткое описание ролика. 2-3 строки, которые появятся при свайпе снизу вверх.',
  comments: [
    { author: 'Иван', text: 'Крутая фича, давно искал подобное.' },
    { author: 'Анна', text: 'А как это работает на практике?' },
    { author: 'Rechman Team', text: 'Анна, всё просто — голосом отдаете команду, система делает.' }
  ],
  docsAnchor: i < 11 ? 'roles' : 'fundamentals',
}));