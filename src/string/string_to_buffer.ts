import file_name_to_codec from 'razomy/buffer/codec/file_name_to_codec';

function string_to_buffer(node: string, parent: string): Buffer {
  const codec = file_name_to_codec(parent);
  return codec.decode(node)
}

export default string_to_buffer;
