import fs from 'fs';
import * as path from 'path';
import * as abstractions from '@razomy/abstractions';

export function toDict(dirPath: abstractions.components.DirPathString) {
  const files: string[] = [];

  function iterate(currentDirPath: abstractions.components.DirPathString) {
    const items = fs.readdirSync(currentDirPath);

    for (const item of items) {
      const itemPath = path.join(currentDirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isFile()) {
        files.push(itemPath);
      } else if (stat.isDirectory()) {
        iterate(itemPath);
      }
    }
  }

  iterate(dirPath);
  return files;
}
