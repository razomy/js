import path from 'path';
import {ICodec} from '../codec/i_codec';
import to_codec from '../buffer/string/to_codec';
import {buffer_types} from '../fs/types';

export const codecs: Record<BufferEncoding & '*', ICodec<Buffer, string>> = {
  'base64': to_codec('base64'),
  'utf-8': to_codec('utf-8'),
  '*': to_codec('utf-8'),
} as const satisfies Record<BufferEncoding & '*', ICodec<Buffer, string>>;

function file_name_to_codec(file_name: string) {
  const type = path.extname(file_name).substring(1);
  return buffer_types.hasOwnProperty(type)
    ? codecs[buffer_types[type]]
    : codecs['*'];
}

export default file_name_to_codec;
