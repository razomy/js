import * as path from 'path';
import fs from 'fs';
import * as fsDirectory from '@razomy/fs-directory';
import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

export function toFs(absolutePath: string, dict:
  abstracts.structures.KeyValue<string, Buffer>
  | abstracts.structures.KeyValueArray<string, Buffer>) {
  if (kv.isAkv(dict)) {
    fsDirectory.tryCreate(absolutePath);
    for (const kv of dict) {
      toFs(absolutePath, kv);
    }
  } else if (kv.isKv(dict)) {
    const [key, branch] = dict;
    const itemAbsolutePath = path.join(absolutePath, key);
    toFs(itemAbsolutePath, branch as abstracts.structures.KeyValueArray<string, Buffer>);
  } else {
    fs.writeFileSync(absolutePath, dict);
  }
}
