import {file_name_to_codec} from 'razomy.fs/extension/file_name_to_codec';

export function to_buffer(node: string, parent: string): Buffer {
  const codec = file_name_to_codec(parent);
  return codec.decode(node)
}


