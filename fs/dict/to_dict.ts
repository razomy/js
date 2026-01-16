import fs from 'fs';
import path from 'path';
import { DirPathString } from 'razomy.path/string';

export function to_dict(dir_path: DirPathString) {
  let files: string[] = [];

  function iterate(current_dir_path: DirPathString) {
    const items = fs.readdirSync(current_dir_path);

    for (const item of items) {
      const item_path = path.join(current_dir_path, item);
      const stat = fs.statSync(item_path);

      if (stat.isFile()) {
        files.push(item_path);
      } else if (stat.isDirectory()) {
        iterate(item_path);
      }
    }
  }

  iterate(dir_path);
  return files;
}


