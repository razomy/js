import * as path from 'path';
import fs from 'fs';
import * as fsDirectory from '@razomy/fs-directory';
import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function toFs(absolutePath: string, dict:
  abstractions.structures.KeyValue<string, Buffer>
  | abstractions.structures.KeyValueArray<string, Buffer>) {
  if (kv.isAkv(dict)) {
    fsDirectory.tryCreate(absolutePath);
    for (const kv of dict) {
      toFs(absolutePath, kv);
    }
  } else if (kv.isKv(dict)) {
    const [key, branch] = dict;
    const itemAbsolutePath = path.join(absolutePath, key);
    toFs(itemAbsolutePath, branch as abstractions.structures.KeyValueArray<string, Buffer>);
  } else {
    fs.writeFileSync(absolutePath, dict);
  }
}
