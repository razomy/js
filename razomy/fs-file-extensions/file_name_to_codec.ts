import * as path from 'path';
import { BUFFER_TYPES } from './is_supported_file_types';
import * as abstracts from '@razomy/abstracts';
import * as bufferString from '@razomy/buffer-string';

export const CODECS: Record<BufferEncoding & '*', abstracts.patterns.Codec<Buffer, string>> = {
  base64: bufferString.toCodec('base64'),
  'utf-8': bufferString.toCodec('utf-8'),
  '*': bufferString.toCodec('utf-8'),
} as const satisfies Record<BufferEncoding & '*', abstracts.patterns.Codec<Buffer, string>>;

export function fileNameToCodec(fileName: string) {
  const type = path.extname(fileName).substring(1);
  return BUFFER_TYPES.hasOwnProperty(type) ? CODECS[BUFFER_TYPES[type]] : CODECS['*'];
}
