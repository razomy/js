import * as fsFileExtensions from '@razomy/fs-file-extensions';

export function toBuffer(node: string, parent: string): Buffer {
  const codec = fsFileExtensions.fileNameToCodec(parent);
  return codec.decode(node);
}
