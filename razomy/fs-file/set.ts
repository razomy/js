import fs from 'fs';
import {FilePathString} from '@razomy/path-string';

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
