import path from 'path';
import fs from 'fs';
import {try_create} from 'razomy.fs/directory/try_create';
import {VrdOrValue} from 'razomy.vrd/vrd';
import {is_vrd} from 'razomy.vrd/is_vrd';

export function to_fs(absolute_path: string, dict: VrdOrValue<Buffer>) {
  if (is_vrd(dict)) {
    try_create(absolute_path)
    for (const key in dict) {
      const branch = dict[key];
      const item_absolute_path = path.join(absolute_path, key);
      to_fs(item_absolute_path, branch);
    }
  } else {
    fs.writeFileSync(absolute_path, dict)
  }
}


