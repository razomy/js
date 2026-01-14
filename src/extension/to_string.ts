import file_name_to_codec from './file_name_to_codec';

export function to_string(data: Buffer, parent: string): string {
  const codec = file_name_to_codec(parent);
  return codec.encode(data)
}

export default to_string;
