import {fileNameToCodec} from './file_name_to_codec';

export function toString_(data: Buffer, parent: string): string {
  const codec = fileNameToCodec(parent);
  return codec.encode(data)
}


