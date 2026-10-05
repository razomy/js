import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function set(filePath: abstracts.components.FilePathString, content) {
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
