import fs from 'fs';
import * as path from 'path';
import {DirPathString} from 'razomy.path.string';

export function toDict(dirPath: DirPathString) {
  let files: string[] = [];

  function iterate(currentDirPath: DirPathString) {
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


