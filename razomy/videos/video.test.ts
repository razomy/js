import * as fs from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { execSync } from 'node:child_process';
import { toVideoByFormat } from './to_video_by_format.node'; // <-- Убедись, что путь правильный
import { VIDEOS } from './types'; // <-- Убедись, что путь правильный

const sourceVideo = path.join(__dirname, 'source_video.mp4');
const outDir = path.join(__dirname, 'tmp');

describe('Video Converter: toVideoByFormat', () => {
  // Видео конвертируется долго. Ставим таймаут 60 секунд на каждый тест.
  // Если у тебя много форматов или слабый ПК, можешь увеличить до 120000 (120 сек).
  jest.setTimeout(60000);

  // Выполняется один раз перед запуском всех тестов
  beforeAll(() => {
    // 1. Создаем папку для результатов
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // 2. Автоматически создаем исходное тестовое видео (5 сек, таймер на экране, звук писк)
    if (!fs.existsSync(sourceVideo)) {
      console.log('Создание тестового видео (5 секунд, 1280x720, звук)...');
      try {
        execSync(
          `ffmpeg -f lavfi -i testsrc=duration=5:size=1280x720:rate=30 -f lavfi -i sine=frequency=1000:duration=5 -c:v libx264 -c:a aac -shortest "${sourceVideo}"`,
          { stdio: 'ignore' } // скрываем вывод FFmpeg, чтобы не засорять консоль
        );
      } catch (error) {
        throw new Error('Ошибка при создании source_video.mp4. Убедитесь, что FFmpeg установлен и доступен в PATH.');
      }
    }
  });

  // (Опционально) очистка после всех тестов
  afterAll(() => {
    fs.rmSync(sourceVideo, { force: true });
  });

  // test.each генерирует отдельный независимый тест для каждого формата из массива
  test.each(VIDEOS)('should convert MP4 to $fileExtensionType', async (fmt) => {
    const targetFormat = fmt.fileExtensionType;

    // Генерируем уникальные имена для временного файла и результата
    const tempInput = path.join(outDir, `temp_input_${Date.now()}_${targetFormat}.mp4`);
    const testOutputFile = path.join(outDir, `result.${targetFormat}`);

    // Копируем исходное видео, так как toVideoByFormat (ffmpeg) обычно удаляет или блокирует входящий файл
    fs.copyFileSync(sourceVideo, tempInput);

    try {
      // 1. Запускаем конвертацию
      const result = await toVideoByFormat(tempInput, targetFormat);

      // 2. Сохраняем стрим в выходной файл
      const outputStream = fs.createWriteStream(testOutputFile);
      await pipeline(result.stream, outputStream);

      // --- ПРОВЕРКИ (Assertions) ---

      // Файл результата должен существовать
      expect(fs.existsSync(testOutputFile)).toBe(true);

      // Размер файла должен быть больше нуля
      const stats = fs.statSync(testOutputFile);
      expect(stats.size).toBeGreaterThan(0);

    } catch (error: any) {
      // Перехватываем ошибку, чтобы добавить понятное описание (полезно при отсутствии кодеков в ОС)
      if (error.message.includes('Encoder not found') || error.message.includes('Unknown encoder')) {
        throw new Error(`Отсутствует кодек для формата ${targetFormat} в вашей версии FFmpeg. Оригинальная ошибка: ${error.message}`);
      }
      throw error; // Бросаем ошибку дальше, чтобы тест провалился
    } finally {
      // Обязательно удаляем временный входной файл после теста (независимо от успеха/провала)
      if (fs.existsSync(tempInput)) {
        fs.rmSync(tempInput, { force: true });
      }
    }
  });
});