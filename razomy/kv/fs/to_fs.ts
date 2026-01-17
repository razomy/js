import path from 'path';
import fs from 'fs';
import {tryCreate} from 'razomy.fs/directory/try_create';
import {isKv, Valuable} from 'razomy.kv/kv';
import {isAkv} from 'razomy.kv/is_akv';

export function toFs(absolutePath: string, dict: Valuable<string, Buffer>) {
  if (isAkv(dict)) {
    tryCreate(absolutePath)
    for (const kv of dict) {
      toFs(absolutePath, kv);
    }
  } else if (isKv(dict)) {
    const [key, branch] = dict;
    const itemAbsolutePath = path.join(absolutePath, key);
    toFs(itemAbsolutePath, branch);
  } else {
    fs.writeFileSync(absolutePath, dict)
  }
}


