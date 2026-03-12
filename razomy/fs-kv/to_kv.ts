import fs from 'fs';
import * as path from 'path';
import * as exceptions from '@razomy/exceptions';
import * as kv_ from '@razomy/kv';

export function toKv<T = kv_.ArrayKeyValuable<string, Buffer>>(dirPath: string): T;
export function toKv<T = kv_.KeyValuable<string, Buffer>>(filePath: string): T;
export function toKv<T extends kv_.ArrayOrKeyValuable<string, Buffer>>(directory: string): T {
  const stat = fs.statSync(directory);
  const kv = kv_.k(path.basename(directory), null as any) as T;

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    kv[1] = data;
    return kv;
  } else if (stat.isDirectory()) {
    kv[1] = kv_.akv<string, Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      const child = toKv<[string, Buffer]>(itemPath);
      kv[1].push(child);
    }
    return kv as T;
  } else {
    throw new exceptions.ArgumentException('unknown file type', directory);
  }
}
