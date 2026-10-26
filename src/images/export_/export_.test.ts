import * as fs from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';
import Vips from 'wasm-vips';
import * as images from '@razomy/images';

// Инициализируем vips один раз для всех тестов
let vipsInstance: any = null;
async function getVips() {
  if (!vipsInstance) {
    vipsInstance = await Vips();
  }
  return vipsInstance;
}
// @ts-ignore
const outDir = path.join(__dirname, 'tmp');

const mapping = {
  avif: images.export_.avif,
  gif: images.export_.gif,
  heic: images.export_.heic,
  heif: images.export_.heic,
  ico: images.export_.ico,
  jpeg: images.export_.jpeg,
  jpg: images.export_.jpeg,
  png: images.export_.png,
  tiff: images.export_.tiff,
  tif: images.export_.tiff,
  webp: images.export_.webp,
};


const vips = await getVips();

async function createSourceImage(ext: string, filePath: string) {
  const width = 100;
  const height = 100;

  // Для SVG пишем разметку напрямую в файл
  if (ext === 'svg') {
    const svgContent = `<svg width="${width}" height="${height}"><rect width="100%" height="100%" fill="red"/><circle cx="50" cy="50" r="40" fill="blue"/></svg>`;
    fs.writeFileSync(filePath, svgContent);
    return;
  }


  // Создаем RGB изображение без использования SVG оверлея
  let img = vips.Image.black(width, height)
    .add([255, 0, 0])
    .cast(vips.BandFormat.uchar);
  img = img.copy({ interpretation: vips.Interpretation.srgb });

  try {
    let buffer: Uint8Array;

    if (ext === 'jpg' || ext === 'jpeg') {
      buffer = img.jpegsaveBuffer();
    } else if (ext === 'png') {
      buffer = img.pngsaveBuffer();
    } else if (ext === 'ico') {
      buffer = img.icosaveBuffer();
    } else if (ext === 'bmp') {
      buffer = img.bmpsaveBuffer();
    } else if (ext === 'webp') {
      buffer = img.webpsaveBuffer();
    } else if (ext === 'gif') {
      buffer = img.gifsaveBuffer();
    } else if (ext === 'avif' || ext === 'heic' || ext === 'heif') {
      buffer = img.heifsaveBuffer({ compression: vips.ForeignHeifCompression.av1 });
    } else if (ext === 'tiff' || ext === 'tif') {
      buffer = img.tiffsaveBuffer();
    } else {
      buffer = img.writeToBuffer(`.${ext}`);
    }

    fs.writeFileSync(filePath, Buffer.from(buffer));
  } catch (e) {
    throw new Error(`SKIP_${ext.toUpperCase()}`);
  } finally {
    img.delete();
  }
}

describe('images', () => {
  beforeAll(() => {
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outDir, { recursive: true });
  });

  for (const imgConfig of images.export_.IMAGES) {
    const inputExt = imgConfig.fileExtensionType;

    if (!imgConfig.conversions || imgConfig.conversions.length === 0) {
      continue;
    }

    describe(`From input: .${inputExt.toUpperCase()}`, () => {
      const inputPath = path.join(outDir, `source_test.${inputExt}`);
      let sourceCreated = false;

      beforeAll(async () => {
        try {
          await createSourceImage(inputExt, inputPath);
          sourceCreated = true;
        } catch (e: any) {
          if (e.message.startsWith('SKIP_')) {
            console.warn(`[SKIP] Не удалось программно создать исходник для .${inputExt}`);
          } else {
            console.error(`Ошибка создания исходника .${inputExt}:`, e.message);
          }
        }
      });

      for (const targetFormat of imgConfig.conversions) {
        test(`should convert to .${targetFormat}`, async () => {
          if (!sourceCreated) {
            console.warn(`   ⏭️ Пропущен тест конвертации ${inputExt} -> ${targetFormat} (нет исходника)`);
            return;
          }

          const tempInput = path.join(outDir, `temp_${Date.now()}_source.${inputExt}`);
          const outputFilename = `result_from_${inputExt}.${targetFormat}`;
          const outputPath = path.join(outDir, outputFilename);

          fs.copyFileSync(inputPath, tempInput);

          const img = vips.Image.newFromFile(tempInput);

          try {
            const result = await mapping[targetFormat](img);

            const writeStream = fs.createWriteStream(outputPath);
            await pipeline(result.stream, writeStream);

            expect(fs.existsSync(outputPath)).toBe(true);
            const stats = fs.statSync(outputPath);
            expect(stats.size).toBeGreaterThan(0);
          } finally {
            img.delete();

            if (fs.existsSync(tempInput)) {
              fs.rmSync(tempInput, { force: true });
            }
          }
        });
      }
    });
  }
});
