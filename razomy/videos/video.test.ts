import * as fs from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { toVideoByFormat } from './to_video_by_format.node'; // <-- Поправь путь
import { videos } from './types'; // <-- Поправь путь

const sourceVideo = './source_video.mp4'; // Файл из Шага 1
const outDir = './test_results';

export const prepare = `
# Создать тестовое видео (5 секунд, таймер на экране, звук писк)
ffmpeg -f lavfi -i testsrc=duration=5:size=1280x720:rate=30 -f lavfi -i sine=frequency=1000:duration=5 -c:v libx264 -c:a aac -shortest source_video.mp4
`;

export const test = `
# В терминале в папке с результатами
for f in *.*; do ffprobe -v error -i "$f" && echo "OK: $f" || echo "FAIL: $f"; done
`;

// Создаем папку для результатов
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

async function runTests() {
  console.log('🚀 ЗАПУСК ТЕСТОВ FFmpeg...\n');

  // --- ТЕСТ ВИДЕО ---
  console.log('--- 🎥 ТЕСТИРУЕМ ВИДЕО ФОРМАТЫ ---');
  for (const fmt of videos) {
    const targetFormat = fmt.fileExtensionType;

    // Некоторые форматы работают только на выход, но не на вход для генерации
    // Пропускаем те, в которые кодировать нельзя (если такие есть в списке)
    try {
      // 1. Создаем копию исходника (т.к. функция его удаляет)
      const tempInput = path.join(outDir, `temp_input_${Date.now()}.mp4`);
      fs.copyFileSync(sourceVideo, tempInput);

      console.log(`⏳ Конвертация MP4 -> ${targetFormat.toUpperCase()}...`);

      const result = await toVideoByFormat(tempInput, targetFormat);

      // 2. Сохраняем результат в файл, чтобы проверить
      const testOutputFile = path.join(outDir, `result.${targetFormat}`);
      const outputStream = fs.createWriteStream(testOutputFile);

      await pipeline(result.stream, outputStream);

      // 3. Проверка
      const stats = fs.statSync(testOutputFile);
      if (stats.size > 0) {
        console.log(`✅ OK: ${targetFormat} (Размер: ${(stats.size / 1024).toFixed(2)} KB)`);
      } else {
        console.error(`❌ FAIL: ${targetFormat} (Файл пустой)`);
      }
    } catch (e: any) {
      console.error(`❌ ERROR ${targetFormat}:`, e.message);
      // Если ошибка "Encoder not found" - значит в твоей системе нет нужного кодека
    }
  }
}

runTests();
