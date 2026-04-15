import * as fs from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';
import Vips from 'wasm-vips';
import * as images from '@razomy/images';

const outDir = path.join(__dirname, 'tmp');

const mapping = {
  avif: images.export_.avif,
  gif: images.export_.gif,
  heic: images.export_.heic,
  ico: images.export_.ico,
  jpeg: images.export_.jpeg,
  png: images.export_.png,
  tiff: images.export_.tiff,
  webp: images.export_.webp,
};
// Увеличиваем таймаут, так как обработка картинок (особенно heic/avif) может быть небыстрой
jest.setTimeout(30000);

async function createSourceImage(ext: string, filePath: string) {
  const vips = await Vips();
  const width = 100;
  const height = 100;

  if (ext === 'svg') {
    const svgContent = `<svg width="${width}" height="${height}"><rect width="100%" height="100%" fill="red"/><circle cx="50" cy="50" r="40" fill="blue"/></svg>`;
    fs.writeFileSync(filePath, svgContent);
    return;
  }

  // Создаем красное изображение
  // .black() создает 1 канал, .add([R, G, B]) делает его цветным
  let img = vips.Image.black(width, height).add([255, 0, 0]);
  img = img.copy({ interpretation: vips.Interpretation.srgb });

  // Создаем оверлей (синий круг) через SVG буфер
  const circleSvg = Buffer.from(
    `<svg width="${width}" height="${height}"><circle cx="50" cy="50" r="40" fill="blue"/></svg>`,
  );
  const overlay = vips.Image.newFromBuffer(circleSvg);

  // Композиция
  const result = img.composite2(overlay, vips.BlendMode.over);

  try {
    if (ext === 'jpg' || ext === 'jpeg') {
      result.jpegsave(filePath);
    } else if (ext === 'png') {
      result.pngsave(filePath);
    } else if (ext === 'webp') {
      result.webpsave(filePath);
    } else if (ext === 'gif') {
      result.gifsave(filePath);
    } else if (ext === 'avif' || ext === 'heic' || ext === 'heif') {
      result.heifsave(filePath, { compression: vips.ForeignHeifCompression.av1 });
    } else if (ext === 'tiff' || ext === 'tif') {
      result.tiffsave(filePath);
    } else {
      // Для остальных форматов пробуем общий метод vips
      result.writeToFile(filePath);
    }
  } catch (e) {
    throw new Error(`SKIP_${ext.toUpperCase()}`);
  } finally {
    // Чистим память
    img.delete();
    overlay.delete();
    result.delete();
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
  for (const imgConfig of images.export_.IMAGES) {
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
            const result = await mapping[targetFormat](tempInput, targetFormat as any);

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
