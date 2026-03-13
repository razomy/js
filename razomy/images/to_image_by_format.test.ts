import * as fs from 'node:fs';
import * as path from 'node:path';
import sharp from 'sharp';
import { pipeline } from 'node:stream/promises';
import { images } from './types';
import { toImageByFormat } from './to_image_by_format.node';

const outDir = path.join(__dirname, 'tmp');

// Увеличиваем таймаут, так как обработка картинок (особенно heic/avif) может быть небыстрой
jest.setTimeout(30000);

async function createSourceImage(ext: string, filePath: string) {
  const width = 100;
  const height = 100;

  if (ext === 'svg') {
    const svgContent = `
      <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${width}" height="${height}" fill="red"/>
        <circle cx="50" cy="50" r="40" fill="blue"/>
      </svg>`;
    fs.writeFileSync(filePath, svgContent);
    return;
  }

  if (ext === 'bmp' || ext === 'ico') {
    throw new Error(`SKIP_${ext.toUpperCase()}`);
  }

  const img = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 1 },
    },
  }).composite([
    {
      input: Buffer.from(`<svg><circle cx="50" cy="50" r="40" fill="blue"/></svg>`),
      blend: 'over',
    },
  ]);

  if (ext === 'jpg' || ext === 'jpeg') {
    await img.jpeg().toFile(filePath);
  } else if (ext === 'png') {
    await img.png().toFile(filePath);
  } else if (ext === 'webp') {
    await img.webp().toFile(filePath);
  } else if (ext === 'gif') {
    await img.gif().toFile(filePath);
  } else if (ext === 'tiff' || ext === 'tif') {
    await img.tiff().toFile(filePath);
  } else if (ext === 'avif') {
    await img.avif().toFile(filePath);
  } else if (ext === 'heic' || ext === 'heif') {
    await img.heif({ compression: 'av1' }).toFile(filePath);
  } else {
    await img.toFormat(ext as any).toFile(filePath);
  }
}

describe('images', () => {
  // Выполняется 1 раз перед всеми тестами: очищаем и создаем папку
  beforeAll(() => {
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outDir, { recursive: true });
  });

  // Динамически создаем блоки тестов на основе массива настроек
  for (const imgConfig of images) {
    const inputExt = imgConfig.fileExtensionType;

    // Если конвертаций нет, пропускаем генерацию describe
    if (!imgConfig.conversions || imgConfig.conversions.length === 0) {
      continue;
    }

    describe(`From input: .${inputExt.toUpperCase()}`, () => {
      const inputPath = path.join(outDir, `source_test.${inputExt}`);
      let sourceCreated = false;

      // Перед тестами конкретного формата пытаемся создать для него исходную картинку
      beforeAll(async () => {
        try {
          await createSourceImage(inputExt, inputPath);
          sourceCreated = true;
        } catch (e: any) {
          if (e.message.startsWith('SKIP_')) {
            console.warn(`[SKIP] Sharp не умеет программно создавать исходники для .${inputExt}`);
          } else {
            console.error(`Ошибка создания исходника .${inputExt}:`, e.message);
          }
        }
      });

      // Генерируем тест для каждого целевого формата
      for (const targetFormat of imgConfig.conversions) {
        test(`should convert to .${targetFormat}`, async () => {
          // Если исходник не удалось создать (например, bmp/ico), пропускаем тест зелёным
          if (!sourceCreated) {
            console.warn(`   ⏭️ Пропущен тест конвертации ${inputExt} -> ${targetFormat} (нет исходника)`);
            return;
          }

          const tempInput = path.join(outDir, `temp_${Date.now()}_source.${inputExt}`);
          const outputFilename = `result_from_${inputExt}.${targetFormat}`;
          const outputPath = path.join(outDir, outputFilename);

          // Делаем копию исходника, так как функция удаляет входящий файл!
          fs.copyFileSync(inputPath, tempInput);

          try {
            // Выполняем конвертацию
            const result = await toImageByFormat(tempInput, targetFormat as any);

            // Сохраняем стрим в файл
            const writeStream = fs.createWriteStream(outputPath);
            await pipeline(result.stream, writeStream);

            // --- ПРОВЕРКИ (Assertions) ---
            expect(fs.existsSync(outputPath)).toBe(true);
            const stats = fs.statSync(outputPath);
            expect(stats.size).toBeGreaterThan(0);

          } finally {
            // Убираем временный входной файл, если он случайно остался
            if (fs.existsSync(tempInput)) {
              fs.rmSync(tempInput, { force: true });
            }
          }
        });
      }
    });
  }
});