import * as fs from 'node:fs';
import * as path from 'node:path';
import {pipeline} from 'node:stream/promises';
import {toAudioByFormat} from './to_audio_by_format'; // <-- Поправь путь
import {audios} from './types'; // <-- Поправь путь

const sourceAudio = './source_audio.mp3'; // Файл из Шага 1
const outDir = './test_results';

const prepare = `
# Создать тестовое аудио (5 секунд, синусоида)
ffmpeg -f lavfi -i sine=frequency=440:duration=5 -c:a libmp3lame source_audio.mp3
`

const test = `
# В терминале в папке с результатами
for f in *.*; do ffprobe -v error -i "$f" && echo "OK: $f" || echo "FAIL: $f"; done
`

// Создаем папку для результатов
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

async function runTests() {
  console.log('🚀 ЗАПУСК ТЕСТОВ FFmpeg...\n');

  // --- ТЕСТ АУДИО ---
  console.log('\n--- 🎵 ТЕСТИРУЕМ АУДИО ФОРМАТЫ ---');
  for (const fmt of audios) {
    const targetFormat = fmt.fileExtensionType;
    try {
      const tempInput = path.join(outDir, `temp_input_${Date.now()}.mp3`);
      fs.copyFileSync(sourceAudio, tempInput);

      console.log(`⏳ Конвертация MP3 -> ${targetFormat.toUpperCase()}...`);

      const result = await toAudioByFormat(tempInput, targetFormat);

      const testOutputFile = path.join(outDir, `result.${targetFormat}`);
      const outputStream = fs.createWriteStream(testOutputFile);

      await pipeline(result.stream, outputStream);

      const stats = fs.statSync(testOutputFile);
      if (stats.size > 0) {
        console.log(`✅ OK: ${targetFormat} (Размер: ${(stats.size / 1024).toFixed(2)} KB)`);
      } else {
        console.error(`❌ FAIL: ${targetFormat} (Файл пустой)`);
      }
    } catch (e: any) {
      console.error(`❌ ERROR ${targetFormat}:`, e.message);
    }
  }
}

runTests();