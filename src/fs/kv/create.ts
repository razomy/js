import path from 'path';
import fs from 'fs';
import {create_directory_if_not_exists} from 'src/fs/directory/create';
import  { is_kv,Valuable} from 'razomy.kv/kv';
import {is_akv} from 'razomy.kv/is_akv';

export function create(absolute_path: string, dict: Valuable<string, Buffer>) {
  if (is_akv(dict)) {
    create_directory_if_not_exists(absolute_path)
    for (const kv of dict) {
      create(absolute_path, kv);
    }
  } else if (is_kv(dict)) {
    const [key, branch] = dict;
    const item_absolute_path = path.join(absolute_path, key);
    create(item_absolute_path, branch);
  } else {
    fs.writeFileSync(absolute_path, dict)
  }
}


