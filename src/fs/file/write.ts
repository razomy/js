import fs from 'fs';
import {create_directory_if_not_exists} from 'razomy.fs/create';
import path from 'path';
import {FilePathString} from 'razomy.path/string/path_string';

export function try_write_file(file_path: FilePathString, content) {
  create_directory_if_not_exists(path.dirname(file_path));
  return fs.writeFileSync(file_path, content, 'utf8');
}

export function write_file(file_path: FilePathString, content) {
  return fs.writeFileSync(file_path, content, 'utf8');
}

export function write_file_json(file_path: FilePathString, content, is_format: boolean = false) {
  return fs.writeFileSync(file_path, JSON.stringify(content, null, is_format ? 2 : 0), 'utf8');
}

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
