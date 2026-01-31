import * as path from 'path';
import {Codec} from 'razomy.codec';
import {bufferTypes} from './is_supported_file_types';
import {toCodec} from 'razomy.buffer.string';

export const codecs: Record<BufferEncoding & '*', Codec<Buffer, string>> = {
  'base64': toCodec('base64'),
  'utf-8': toCodec('utf-8'),
  '*': toCodec('utf-8'),
} as const satisfies Record<BufferEncoding & '*', Codec<Buffer, string>>;

export function fileNameToCodec(fileName: string) {
  const type = path.extname(fileName).substring(1);
  return bufferTypes.hasOwnProperty(type)
    ? codecs[bufferTypes[type]]
    : codecs['*'];
}
