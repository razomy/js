import path from 'path';
import fs from 'fs';
import {try_create} from 'razomy.fs/directory/try_create';
import  { is_kv,Valuable} from 'razomy.kv/kv';
import {is_akv} from 'razomy.kv/is_akv';

export function to_fs(absolute_path: string, dict: Valuable<string, Buffer>) {
  if (is_akv(dict)) {
    try_create(absolute_path)
    for (const kv of dict) {
      to_fs(absolute_path, kv);
    }
  } else if (is_kv(dict)) {
    const [key, branch] = dict;
    const item_absolute_path = path.join(absolute_path, key);
    to_fs(item_absolute_path, branch);
  } else {
    fs.writeFileSync(absolute_path, dict)
  }
}


