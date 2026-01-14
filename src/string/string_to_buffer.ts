import file_name_to_codec from '../extension/file_name_to_codec';

export default function string_to_buffer(node: string, parent: string): Buffer {
  const codec = file_name_to_codec(parent);
  return codec.decode(node)
}


