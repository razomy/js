import ffmpeg from 'fluent-ffmpeg';
import {type ExtensionResult} from '@razomy/fs-file-format';
import {audios} from './types';
import path from 'node:path';
import fs from 'node:fs';
import ffmpegPath from 'ffmpeg-static';

// Явно указываем путь к бинарнику
if (ffmpegPath) ffmpeg.setFfmpegPath(ffmpegPath);

// --- ИСПРАВЛЕННАЯ КАРТА АЛИАСОВ ---
// FFmpeg требует указывать внутреннее имя формата (muxer), а не расширение файла
const formatAliases: Record<string, string> = {
  'm4v': 'mp4',        // <--- ГЛАВНОЕ ИСПРАВЛЕНИЕ: M4V пишем через MP4 muxer
  'mkv': 'matroska',
  'avi': 'avi',
  'mov': 'mov',
  'm4a': 'ipod',       // Audio-only MP4 часто требует формат 'ipod' или 'mp4'
  'aac': 'adts',       // Raw AAC stream
  'ts': 'mpegts',
  'mts': 'mpegts',
  'm2ts': 'mpegts',
  'mpg': 'mpeg',
  'wmv': 'asf',        // WMV упаковывается в ASF
  'wma': 'asf',
  'alac': 'ipod',
  'amr': 'amr',
  '3g2': '3g2',        // У 3g2 есть свой muxer
  'rmvb': 'rm',    // <--- Добавить это
  'dv': 'dv',      // Явно указываем
};

// ... exports videos и audios (оставляем как были) ...

export async function toAudioByFormat(inputPath: string, format: string): Promise<ExtensionResult> {
  const outputPath = path.join('/tmp', `out_${Date.now()}.${format}`);

  function cleanupInput() {
    return fs.unlink(inputPath, () => {
    });
  }

  // Определяем правильный формат для FFmpeg (-f flag)
  // Если алиаса нет, используем само расширение
  const outputFormat = formatAliases[format] || format;

  await new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);

    // ==========================================
    // ЛОГИКА ДЛЯ АУДИО
    // ==========================================

    if (format === 'mp3') {
      command = command.audioCodec('libmp3lame').audioBitrate(192);
    } else if (['wav', 'aiff'].includes(format)) {
      command = command.audioCodec('pcm_s16le');
    } else if (format === 'ogg') {
      command = command.audioCodec('libvorbis');
    } else if (format === 'opus') {
      command = command.audioCodec('libopus');
    } else if (format === 'flac') {
      command = command.audioCodec('flac');
    } else if (['m4a', 'aac', 'alac'].includes(format)) {
      if (format === 'alac') command = command.audioCodec('alac');
      else command = command.audioCodec('aac').audioBitrate(192);

      command = command.outputOptions(['-movflags', '+faststart']);
    } else if (format === 'ac3') {
      command = command.audioCodec('ac3').audioBitrate(192);
    } else if (format === 'wma') {
      command = command.audioCodec('wmav2');
    }
    // 15. RM / RMVB (RealMedia)
    else if (['rm', 'rmvb'].includes(format)) {
      // Настоящие энкодеры RealVideo (rv10/rv20) редко встроены.
      // Используем совместимый mpeg4 внутри контейнера RM.
      command = command
        .videoCodec('mpeg4')
        .audioCodec('ac3') // Или libmp3lame
        .outputOptions(['-qscale:v', '5']);
    }

    // --- AUDIO: AMR ---
    else if (format === 'amr') {
      command = command
        .audioCodec('libopencore_amrnb') // Правильное имя библиотеки (не amr_nb)
        .audioChannels(1)
        .audioFrequency(8000)
        .outputOptions(['-ar', '8000']);
    } else if (format === 'dts') {
      command = command
        .audioCodec('dca')
        .outputOptions(['-strict', '-2']);
    }

    // ==========================================
    // ЗАПУСК
    // ==========================================

    command
      .toFormat(outputFormat) // Теперь сюда попадает 'mp4' вместо 'm4v'
      .on('end', () => {
        cleanupInput();
        resolve(true);
      })
      .on('error', (err) => {
        cleanupInput();
        console.error(`FFmpeg Error (${format}):`, err.message);
        reject(err);
      })
      .save(outputPath);
  });

  const fileStream = fs.createReadStream(outputPath);
  fileStream.on('close', () => {
    fs.unlink(outputPath, () => {
    });
  });

  const mimeType = audios.find(a => a.fileExtensionType === format)?.mediaType
    || 'application/octet-stream';

  return {stream: fileStream, mediaType: mimeType, fileExtensionType: format};
}