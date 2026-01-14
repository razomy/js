import fs from 'fs';
import {SourcePathString} from 'razomy.path/string/path_string';

export function read_file(file_path) {
  return fs.readFileSync(file_path, 'utf8');
}

export function read_file_async(file_path) {
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

export function read_file_json(file_path) {
  return JSON.parse(fs.readFileSync(file_path, 'utf8'));
}

export function try_read_file_json(file_path) {
  if (!fs.existsSync(file_path)) {
    return null;
  }
  return read_file_json(file_path);
}

export function is_exist(file_path: SourcePathString) {
  return fs.existsSync(file_path);
}