import path from 'path';
import fs from 'fs';
import create_directory_if_not_exists from 'src/fs/directory/create';
import {VrdOrValue} from 'razomy.vrd/vrd';
import is_vrd from 'src/vrd/is_vrd';

export default function vrd_to_fs(absolute_path: string, dict: VrdOrValue<Buffer>) {
  if (is_vrd(dict)) {
    create_directory_if_not_exists(absolute_path)
    for (const key in dict) {
      const branch = dict[key];
      const item_absolute_path = path.join(absolute_path, key);
      vrd_to_fs(item_absolute_path, branch);
    }
  } else {
    fs.writeFileSync(absolute_path, dict)
  }
}


