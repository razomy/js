import fs from 'fs';
import type { FilePathString } from '@razomy/abstracts/graphs';

export function set(filePath: FilePathString, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
}
