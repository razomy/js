import fs from 'fs';
import path from 'path';
import {ArgumentException} from 'razomy.js/exceptions/argument_exception';
import {Vrd, VrdOrValue} from 'razomy.js/vrd/vrd';

export function fs_to_vrd(directory: string, is_skip: (path) => boolean): VrdOrValue<Buffer> {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return data;
  } else if (stat.isDirectory()) {
    let files: Vrd<Buffer> = new Vrd<Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      if(is_skip(itemPath)) {
          continue
      }
      files[item] = fs_to_vrd(itemPath, is_skip);
    }
    return files;
  } else {
    throw new ArgumentException('unkown file type', directory)
  }
}
