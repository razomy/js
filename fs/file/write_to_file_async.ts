import fs from 'fs';
import { FilePathString } from 'razomy.path/string/path_string';

export function write_to_file_async(file_path: FilePathString, content) {
    return new Promise((resolve, reject) => {
    fs.writeFile(file_path, content, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(file_path);
      }
    });
    });
}
