import * as path from 'path';
import fs from 'fs';
import * as fsDirectory from "@razomy/fs-directory";
import * as kv from "@razomy/kv";

export function toFs(absolutePath: string, dict: kv.Valuable<string, Buffer>) {
  if (kv.isAkv(dict)) {
    fsDirectory.tryCreate(absolutePath);
    for (const kv of dict) {
      toFs(absolutePath, kv);
    }
  } else if (kv.isKv(dict)) {
    const [key, branch] = dict;
    const itemAbsolutePath = path.join(absolutePath, key);
    toFs(itemAbsolutePath, branch);
  } else {
    fs.writeFileSync(absolutePath, dict);
  }
}
