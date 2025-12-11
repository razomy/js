import fs from 'fs';
import path from 'path';
import {ArgumentException} from 'razomy.js/exceptions/argument_exception';
import {ValueRecursiveDict, ValueRecursiveDictOrValue} from 'razomy.js/vrd/value';

export function get(directory: string, is_skip: (path) => boolean): ValueRecursiveDictOrValue<Buffer> {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return data;
  } else if (stat.isDirectory()) {
    let files: ValueRecursiveDict<Buffer> = new ValueRecursiveDict<Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      if(is_skip(itemPath)) {
          continue
      }
      files[item] = get(itemPath, is_skip);
    }
    return files;
  } else {
    throw new ArgumentException('unkown file type', directory)
  }
}
