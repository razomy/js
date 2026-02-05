import fs from 'fs';
import * as path from 'path';
import {ArgumentException} from '@razomy/exceptions';
import {ArrayKeyValuable, ArrayOrKeyValuable, KeyValuable} from '@razomy/kv';
import {akv} from '@razomy/kv';
import {k} from '@razomy/kv';

export function toKv<T = ArrayKeyValuable<string, Buffer>>(dirPath: string): T;
export function toKv<T = KeyValuable<string, Buffer>>(filePath: string): T;
export function toKv<T extends ArrayOrKeyValuable<string, Buffer>>(directory: string): T {
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
      const itemPath = path.join(directory, item);
      const child = toKv<[string, Buffer]>(itemPath);
      kv[1].push(child)
    }
    return kv as T;
  } else {
    throw new ArgumentException('unknown file type', directory)
  }
}


