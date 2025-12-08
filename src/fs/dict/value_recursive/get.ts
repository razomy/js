import fs from "fs";
import path from "path";
import {ArgumentException} from "razomy.js/exceptions/argument_exception";
import {ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/vrd/value";

function order_by_create_date(directory: string, items: string[]) {
  return items
    .map(folder => {
      const fullFolderPath = path.join(directory, folder);
      const stats = fs.statSync(fullFolderPath);
      return {path: folder, ctimeMs: stats.ctimeMs}
    })
    .sort((a, b) => a.ctimeMs - b.ctimeMs)
    .map(i => i.path);
}

export function get(directory: string, is_skip: (path) => boolean): ValueRecursiveDictOrValue<Buffer> {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return data;
  } else if (stat.isDirectory()) {
    let files: ValueRecursiveDict<Buffer> = new ValueRecursiveDict<Buffer>();
    const items = order_by_create_date(directory, fs.readdirSync(directory));
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
