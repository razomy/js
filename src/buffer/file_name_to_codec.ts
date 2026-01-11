import path from 'path';
import {ICodec} from 'razomy/codec/i_codec';
import {buffer_to_string_codec} from 'razomy/buffer/buffer_to_string_codec';
import {buffer_types} from 'razomy/fs/types';

export const codecs: Record<BufferEncoding & '*', ICodec<Buffer, string>> = {
  'base64': buffer_to_string_codec('base64'),
  'utf-8': buffer_to_string_codec('utf-8'),
  '*': buffer_to_string_codec('utf-8'),
} as const satisfies Record<BufferEncoding & '*', ICodec<Buffer, string>>;

export function file_name_to_codec(file_name: string) {
  const type = path.extname(file_name).substring(1);
  return buffer_types.hasOwnProperty(type)
    ? codecs[buffer_types[type]]
    : codecs['*'];
}
