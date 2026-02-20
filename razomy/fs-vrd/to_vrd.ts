import fs from 'fs';
import * as path from 'path';
import {ArgumentException} from '@razomy/exceptions';
import {Vrd, type VrdOrValue} from '@razomy/vrd';

export function toVrd(directory: string, isSkip: (path) => boolean): VrdOrValue<Buffer> {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return data;
  } else if (stat.isDirectory()) {
    let files: Vrd<Buffer> = new Vrd<Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      if (isSkip(itemPath)) {
        continue
      }
      files[item] = toVrd(itemPath, isSkip);
    }
    return files;
  } else {
    throw new ArgumentException('unkown file type', directory)
  }
}


