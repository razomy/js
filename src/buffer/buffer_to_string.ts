import {file_name_to_codec} from 'razomy/buffer/file_name_to_codec';

export function buffer_to_string(data: Buffer, parent: string): string {
  const codec = file_name_to_codec(parent);
  return codec.encode(data)
}
