import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function get(filePath: abstracts.graphs.FilePathString) {
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
