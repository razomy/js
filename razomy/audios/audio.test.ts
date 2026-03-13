import * as fs from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { execSync } from 'node:child_process';
import { toAudioByFormat } from './to_audio_by_format.node'; // <-- Убедись, что путь правильный
import { audios } from './types'; // <-- Убедись, что путь правильный

const sourceAudio = path.join(__dirname, 'source_audio.mp3');
const outDir = path.join(__dirname, 'tmp');

describe('audios', () => {
  // Конвертация может занимать время, увеличиваем таймаут для Jest (по умолчанию 5 сек)
  jest.setTimeout(30000);

  // Выполняется один раз перед запуском всех тестов
  beforeAll(() => {
    // 1. Создаем папку для результатов
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // 2. Автоматически создаем исходный тестовый файл (5 сек, синусоида), если его нет
    if (!fs.existsSync(sourceAudio)) {
      console.log('Создание тестового аудио (5 секунд, синусоида)...');
      try {
        execSync(
          `ffmpeg -f lavfi -i sine=frequency=440:duration=5 -c:a libmp3lame "${sourceAudio}"`,
          { stdio: 'ignore' }
        );
      } catch (error) {
        throw new Error('Ошибка при создании source_audio.mp3. Убедитесь, что FFmpeg установлен.');
      }
    }
  });

  // Выполняется один раз после завершения всех тестов (по желанию можно удалить tmp папку)
  afterAll(() => {
    fs.rmSync(sourceAudio, { force: true }); // раскомментируй, если нужно удалять исходник
  });

  // test.each автоматически создаст отдельный тест для каждого элемента массива audios
  test.each(audios)('should convert MP3 to $fileExtensionType', async (fmt) => {
    const targetFormat = fmt.fileExtensionType;
    const tempInput = path.join(outDir, `temp_input_${Date.now()}_${targetFormat}.mp3`);
    const testOutputFile = path.join(outDir, `result.${targetFormat}`);

    // Копируем исходник во временный файл
    fs.copyFileSync(sourceAudio, tempInput);

    try {
      // Запускаем конвертацию
      const result = await toAudioByFormat(tempInput, targetFormat);

      // Сохраняем результат
      const outputStream = fs.createWriteStream(testOutputFile);
      await pipeline(result.stream, outputStream);

      // --- ПРОВЕРКИ (Assertions) ---

      // 1. Файл должен существовать
      expect(fs.existsSync(testOutputFile)).toBe(true);

      // 2. Размер файла должен быть больше 0
      const stats = fs.statSync(testOutputFile);
      expect(stats.size).toBeGreaterThan(0);

    } finally {
      // Удаляем временный входной файл после теста, чтобы не засорять папку
      if (fs.existsSync(tempInput)) {
        fs.unlinkSync(tempInput);
      }
    }
  });
});