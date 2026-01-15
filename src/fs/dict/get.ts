import fs from 'fs';
import path from 'path';

export function get(directory) {
  let files: string[] = [];

  function walk(current_dir_path) {
    const items = fs.readdirSync(current_dir_path);

    for (const item of items) {
      const item_path = path.join(current_dir_path, item);
      const stat = fs.statSync(item_path);

      if (stat.isFile()) {
        files.push(item_path);
      } else if (stat.isDirectory()) {
        walk(item_path);
      }
    }
  }

  walk(directory);
  return files;
}


