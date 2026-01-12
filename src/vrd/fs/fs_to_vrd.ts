import fs from 'fs';
import path from 'path';
import {ArgumentException} from 'razomy/exceptions/argument_exception';
import {Vrd, VrdOrValue} from 'razomy/vrd/vrd';

function fs_to_vrd(directory: string, is_skip: (path) => boolean): VrdOrValue<Buffer> {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return data;
  } else if (stat.isDirectory()) {
    let files: Vrd<Buffer> = new Vrd<Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const item_path = path.join(directory, item);
      if(is_skip(item_path)) {
          continue
      }
      files[item] = fs_to_vrd(item_path, is_skip);
    }
    return files;
  } else {
    throw new ArgumentException('unkown file type', directory)
  }
}

export default fs_to_vrd;
