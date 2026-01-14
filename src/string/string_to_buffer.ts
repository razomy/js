import file_name_to_codec from '../extension/file_name_to_codec';

export function string_to_buffer(node: string, parent: string): Buffer {
  const codec = file_name_to_codec(parent);
  return codec.decode(node)
}

export default string_to_buffer;
