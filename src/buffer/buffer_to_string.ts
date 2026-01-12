import file_name_to_codec from 'razomy/buffer/file_name_to_codec';

function buffer_to_string(data: Buffer, parent: string): string {
  const codec = file_name_to_codec(parent);
  return codec.encode(data)
}

export default buffer_to_string;
