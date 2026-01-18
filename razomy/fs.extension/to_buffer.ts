import {fileNameToCodec} from 'razomy.fs.extension';

export function toBuffer(node: string, parent: string): Buffer {
  const codec = fileNameToCodec(parent);
  return codec.decode(node)
}


