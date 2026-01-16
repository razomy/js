import fs from 'fs';

export function get_async(file_path) {
    return new Promise((resolve, reject) => {
    fs.readFile(file_path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
    });
}
