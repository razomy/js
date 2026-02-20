import * as path from 'path';
import fs from 'fs';
import {tryCreate} from '@razomy/fs-directory';
import {isAkv, isKv, type Valuable} from '@razomy/kv';

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


