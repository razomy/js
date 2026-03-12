import fs from 'fs';
import * as path from 'path';
import * as abstracts from '@razomy/abstracts';

export function toDict(dirPath: abstracts.graphs.DirPathString) {
  let files: string[] = [];

  function iterate(currentDirPath: abstracts.graphs.DirPathString) {
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
