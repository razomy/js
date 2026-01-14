import fs from 'fs';
import path from 'path';
import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {ArrayKeyValuable, ArrayOrKeyValuable,  KeyValuable, Valuable, Value} from 'razomy.kv/kv';
import akv from 'razomy.kv/akv';
import k from 'src/kv/k';

export default function get<T = ArrayKeyValuable<string, Buffer>>(dir_path: string): T;
export default function get<T = KeyValuable<string, Buffer>>(file_path: string): T;
export default function get<T extends ArrayOrKeyValuable<string, Buffer>>(directory: string): T {
  const stat = fs.statSync(directory);
  const kv = k(path.basename(directory), null as any) as T;

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    kv[1] = data;
    return kv;
  } else if (stat.isDirectory()) {
    kv[1] = akv<string, Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const item_path = path.join(directory, item);
      const child = get<[string, Buffer]>(item_path);
      kv[1].push(child)
    }
    return kv as T;
  } else {
    throw new ArgumentException('unknown file type', directory)
  }
}


