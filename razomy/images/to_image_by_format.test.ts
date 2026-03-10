import * as fs from 'node:fs';
import * as path from 'node:path';
import sharp from 'sharp';
import { pipeline } from 'node:stream/promises';
import { images } from './types';
import { toImageByFormat } from './to_image_by_format.node';
// 👇 УКАЖИ ПРАВИЛЬНЫЙ ПУТЬ К ТВОЕМУ ФАЙЛУ

const outDir = './test_images_out';

// Создаем папку для тестов
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

// Функция создания исходного изображения для тестов
async function createSourceImage(ext: string, filePath: string) {
  const width = 100;
  const height = 100;

  // 1. Специфичный случай: SVG (это просто XML текст)
  if (ext === 'svg') {
    const svgContent = `
      <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${width}" height="${height}" fill="red"/>
        <circle cx="50" cy="50" r="40" fill="blue"/>
      </svg>`;
    fs.writeFileSync(filePath, svgContent);
    return;
  }

  // 2. Специфичный случай: BMP (Sharp не умеет писать BMP)
  if (ext === 'bmp') {
    throw new Error('SKIP_BMP'); // Пропускаем генерацию, т.к. нечем создать BMP программно
  }

  // 3. Остальные растровые форматы генерируем через Sharp
  // Создаем красный квадрат с синим кругом
  let img = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 1 },
    },
  }).composite([
    {
      input: Buffer.from(`<svg><circle cx="50" cy="50" r="40" fill="blue"/></svg>`),
      blend: 'over',
    },
  ]);

  // Настройки сохранения для капризных форматов
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
  } else if (ext === 'ico') {
    // Sharp не умеет писать .ico нативно, сохраняем как png (тест пропустит это)
    throw new Error('SKIP_ICO_SOURCE');
  } else {
    // Пробуем дефолт
    await img.toFormat(ext as any).toFile(filePath);
  }
}

async function runTests() {
  console.log('🚀 ЗАПУСК ТЕСТОВ GAMBAR (SHARP)...\n');

  for (const imgConfig of images) {
    const inputExt = imgConfig.fileExtensionType;
    const inputFilename = `source_test.${inputExt}`;
    const inputPath = path.join(outDir, inputFilename);

    console.log(`\n--- 📂 Тест входа: .${inputExt.toUpperCase()} ---`);

    // 1. Пытаемся создать исходник
    try {
      await createSourceImage(inputExt, inputPath);
    } catch (e: any) {
      console.error(e);
      if (e.message === 'SKIP_BMP' || e.message === 'SKIP_ICO_SOURCE') {
        console.log(`   ⏭️  Пропуск генерации исходника (Sharp не умеет писать .${inputExt})`);
        continue;
      }
      console.log(`   ⚠️  Не удалось создать исходник .${inputExt} (возможно, нет системного кодека):`, e.message);
      continue;
    }

    // 2. Пробуем конвертировать во все доступные форматы
    if (!imgConfig.conversions || imgConfig.conversions.length === 0) {
      console.log('   ℹ️  Нет доступных конвертаций для этого типа');
      continue;
    }

    for (const targetFormat of imgConfig.conversions) {
      const tempInput = path.join(outDir, `temp_${Date.now()}_${inputFilename}`);

      try {
        // ВАЖНО: Твоя функция удаляет файл! Делаем копию перед тестом.
        fs.copyFileSync(inputPath, tempInput);

        // Запуск твоей функции
        const result = await toImageByFormat(tempInput, targetFormat as any);

        // Сохранение результата
        const outputFilename = `result_from_${inputExt}.${targetFormat}`;
        const outputPath = path.join(outDir, outputFilename);
        const writeStream = fs.createWriteStream(outputPath);

        await pipeline(result.stream, writeStream);

        // Проверка
        const stats = fs.statSync(outputPath);
        if (stats.size > 0) {
          console.log(`   ✅ OK: -> .${targetFormat} (${(stats.size / 1024).toFixed(2)} KB)`);
        } else {
          console.error(`   ❌ FAIL: -> .${targetFormat} (Файл пустой)`);
        }
      } catch (err: any) {
        console.error(`   ❌ ERROR: -> .${targetFormat}`, err.message);
      }
    }
  }

  // Очистка исходников (опционально)
  // fs.rmSync(OUT_DIR, { recursive: true, force: true });
  console.log(`\n🏁 Тесты завершены. Результаты в папке ${outDir}`);
}

runTests().catch((err) => console.error('FATAL:', err));
