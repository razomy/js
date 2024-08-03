import fs from "fs";
import path from "path";
import {ArgumentException} from "razomy.js/exceptions/argument_exception";
import {ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";

export function get(directory: string): ValueRecursiveDictOrValue<Buffer> {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return data;
  } else if (stat.isDirectory()) {
    let files: ValueRecursiveDict<Buffer> = new ValueRecursiveDict<Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      files[item] = get(itemPath);
    }
    return files;
  } else {
    throw new ArgumentException('unkown file type', directory)
  }
}
