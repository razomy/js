import {file_name_to_codec} from 'razomy.js/buffer/file_name_to_codec';

export function string_to_buffer(node: string, parent: string): Buffer {
  const codec = file_name_to_codec(parent);
  return codec.decode(node)
}
