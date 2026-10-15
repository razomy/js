import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function set(filePath: abstractions.components.FilePathString, content) {
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
