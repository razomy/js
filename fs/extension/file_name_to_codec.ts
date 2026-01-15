import path from 'path';
import {Codec} from 'razomy.codec';
import {buffer_types} from './types';
import { to_codec } from 'razomy.buffer/string/to_codec';

export const codecs: Record<BufferEncoding & '*', Codec<Buffer, string>> = {
  'base64': to_codec('base64'),
  'utf-8': to_codec('utf-8'),
  '*': to_codec('utf-8'),
} as const satisfies Record<BufferEncoding & '*', Codec<Buffer, string>>;

export function file_name_to_codec(file_name: string) {
  const type = path.extname(file_name).substring(1);
  return buffer_types.hasOwnProperty(type)
    ? codecs[buffer_types[type]]
    : codecs['*'];
}
