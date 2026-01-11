import fs from "fs";
import path from "path";
import {ArgumentException} from "razomy/exceptions/argument_exception";
import {ArrayKeyValuable, ArrayOrKeyValuable, k, KeyValuable, Valuable, Value} from "razomy/kv/kv";
import {ak} from "razomy/kv/akv";

export function get<T = ArrayKeyValuable<string, Buffer>>(dir_path: string): T;
export function get<T = KeyValuable<string, Buffer>>(file_path: string): T;
export function get<T extends ArrayOrKeyValuable<string, Buffer>>(directory: string): T {
  const stat = fs.statSync(directory);
  const kv = k(path.basename(directory), null as any) as T;

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    kv[1] = data;
    return kv;
  } else if (stat.isDirectory()) {
    kv[1] = ak<string, Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      const child = get<[string, Buffer]>(itemPath);
      kv[1].push(child)
    }
    return kv as T;
  } else {
    throw new ArgumentException('unknown file type', directory)
  }
}
