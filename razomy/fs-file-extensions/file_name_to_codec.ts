import * as path from 'path';
import * as abstracts from '@razomy/abstracts';
import * as buffer from '@razomy/buffer';
import * as fsFileExtensions from '@razomy/fs-file-extensions';

export const CODECS: Record<BufferEncoding & '*', abstracts.patterns.Codec<Buffer, string>> = {
  base64: buffer.toCodec('base64'),
  'utf-8': buffer.toCodec('utf-8'),
  '*': buffer.toCodec('utf-8'),
} as const satisfies Record<BufferEncoding & '*', abstracts.patterns.Codec<Buffer, string>>;

export function fileNameToCodec(fileName: string) {
  const type = path.extname(fileName).substring(1);
  return fsFileExtensions.BUFFER_TYPES.hasOwnProperty(type) ? CODECS[fsFileExtensions.BUFFER_TYPES[type]] : CODECS['*'];
}
