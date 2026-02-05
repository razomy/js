import fs from 'fs';
import {FilePathString} from '@razomy/path.string';

export function get(filePath: FilePathString) {
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
