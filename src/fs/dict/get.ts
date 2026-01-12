import fs from 'fs';
import path from 'path';

function get(directory) {
  let files: string[] = [];

  function walk(currentDirPath) {
    const items = fs.readdirSync(currentDirPath);

    for (const item of items) {
      const item_path = path.join(currentDirPath, item);
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

export default get;
