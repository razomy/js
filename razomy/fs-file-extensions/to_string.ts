import * as fsFileExtensions from '@razomy/fs-file-extensions';

export function toString_(data: Buffer, parent: string): string {
  const codec = fsFileExtensions.fileNameToCodec(parent);
  return codec.encode(data);
}
