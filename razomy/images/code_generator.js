import * as fs from 'fs';
import * as path from 'path';

// Все форматы, с которыми будем работать
const FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'tiff', 'tif', 'heif', 'heic', 'gif', 'ico'];
const OUTPUT_DIR = path.resolve('');

function generateImageConverterStructure() {
    // 1. Создаем корневую папку
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // 2. Создаем базовый движок (engine.ts) с логикой Sharp и английскими комментариями
    const engineCode = `import * as fs from 'node:fs';
import sharp from 'sharp';
import { images, type OnlyReadImageFileExtensionType, type ReadAndWriteImageFileExtensionType } from '../types';
import type * as fsFileFormat from '@razomy/fs-file-format';

// --- SHARP (Images Engine) ---
export async function toImageByFormat(
  inputPath: string,
  format: ReadAndWriteImageFileExtensionType | OnlyReadImageFileExtensionType | string,
): Promise<fsFileFormat.ExtensionResult> {
  // failOnError: false allows opening partially corrupted files
  let pipeline = sharp(inputPath, { failOn: 'error' });

  // Preserve metadata (EXIF, orientation)
  pipeline = pipeline.rotate().withMetadata();

  // --- CONVERSION SETTINGS ---
  switch (format) {
    case 'jpg':
    case 'jpeg':
      pipeline = pipeline.jpeg({
        mozjpeg: true,
        quality: 80,
        chromaSubsampling: '4:4:4', // Better color quality
      });
      break;

    case 'png':
      pipeline = pipeline.png({
        compressionLevel: 8,
        palette: true, // Creates an 8-bit palette (significantly reduces file size)
        effort: 7, // Maximum compression effort
      });
      break;

    case 'webp':
      pipeline = pipeline.webp({
        quality: 80,
        effort: 4,
        lossless: false,
      });
      break;

    case 'avif':
      pipeline = pipeline.avif({
        quality: 60, // AVIF maintains quality even at low values
        effort: 4,
        lossless: false,
      });
      break;

    case 'tiff':
    case 'tif':
      pipeline = pipeline.tiff({
        compression: 'lzw', // Lossless compression
        quality: 80,
      });
      break;

    case 'heif':
    case 'heic':
      pipeline = pipeline.heif({
        compression: 'av1',
        quality: 65,
      });
      break;

    case 'gif':
      // Sharp can save animated GIFs (requires libvips >= 8.11.0)
      pipeline = pipeline.gif({
        loop: 0,
        effort: 7,
      });
      break;

    case 'ico':
      // HACK: Browsers understand PNG renamed to ICO.
      // True ICO format is not supported by sharp, but this method works for favicons.
      pipeline = pipeline
        .resize({ width: 256, height: 256, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFormat('png');
      break;

    // Warning: Sharp DOES NOT support saving to BMP or PDF natively.
    default:
      // If the format is directly supported by sharp
      pipeline = pipeline.toFormat(format as keyof sharp.FormatEnum);
  }

  // If it's not our ICO hack, apply the format explicitly
  if (format !== 'ico') {
    pipeline = pipeline.toFormat(format as keyof sharp.FormatEnum);
  }

  const stream = pipeline;

  // Delete input file after stream ends
  function cleanup() {
    return fs.unlink(inputPath, () => {});
  }

  stream.on('end', cleanup);
  stream.on('error', (err) => {
    console.error(\`Sharp conversion error (\${format}):\`, err);
    cleanup();
  });

  // Determine final MIME type and extension
  const outExt = format === 'ico' ? 'ico' : format;
  const outMime = images?.find((a: any) => a.fileExtensionType === outExt)?.mediaType || 'application/octet-stream';

  return { stream, mediaType: outMime, fileExtensionType: outExt };
}
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'engine.ts'), engineCode);

    let indexCode = '';

    // 3. Генерируем папки (исходящий формат) и файлы (целевой формат)
    for (const sourceFormat of FORMATS) {
        // Создаем папку для формата (например, image-converters/jpg)
        const dirPath = path.join(OUTPUT_DIR, sourceFormat);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        let indexFileCode = ``;

        for (const targetFormat of FORMATS) {
            // Пропускаем конвертацию в самого себя (например, jpg -> jpg)
            if (sourceFormat === targetFormat) continue;

            let fileCode = `import { toImageByFormat } from '../to_image_by_format.node';\n`;
            fileCode += `import type * as fsFileFormat from '@razomy/fs-file-format';\n\n`;

            fileCode += `/**\n`;
            fileCode += ` * Convert from ${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()}\n`;
            fileCode += ` */\n`;
            fileCode += `export async function ${targetFormat}(inputPath: string): Promise<fsFileFormat.ExtensionResult> {\n`;
            fileCode += `    return await toImageByFormat(inputPath, '${targetFormat}');\n`;
            fileCode += `}\n`;

            // Записываем файл (например, image-converters/jpg/png.ts)
            fs.writeFileSync(path.join(dirPath, `${targetFormat}.node.ts`), fileCode);

            // Добавляем в локальный index.ts
            indexFileCode += `export { ${targetFormat} } from './${targetFormat}';\n`;
        }

        // Записываем index.ts внутри папки
        fs.writeFileSync(path.join(dirPath, 'index.node.ts'), indexFileCode);

        // Добавляем запись в глобальный index.ts как namespace
        indexCode += `export * as ${sourceFormat} from "./${sourceFormat}";\n`;
    }

    // 4. Записываем глобальный index.ts
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.node.ts'), indexCode);
    console.log('✅ Структура папок для конвертации картинок успешно сгенерирована!');
}

// Запускаем генератор
generateImageConverterStructure();