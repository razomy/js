import {fileNameToCodec} from 'razomy.fs/extension/file_name_to_codec';

export function toBuffer(node: string, parent: string): Buffer {
  const codec = fileNameToCodec(parent);
  return codec.decode(node)
}


