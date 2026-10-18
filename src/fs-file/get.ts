import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function get(filePath: abstractions.fs.FilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
