import fs from 'fs';
import {createDirectoryIfNotExists} from 'razomy/fs/create';
import path from "path";
import {FilePathString} from "src/fs/path/pathString";

export function tryWriteFile(file_path: FilePathString, content) {
  createDirectoryIfNotExists(path.dirname(file_path));
  return fs.writeFileSync(file_path, content, 'utf8');
}

export function writeFile(file_path: FilePathString, content) {
  return fs.writeFileSync(file_path, content, 'utf8');
}

export function writeFileJson(file_path: FilePathString, content) {
  return fs.writeFileSync(file_path, JSON.stringify(content), 'utf8');
}

export function writeToFileAsync(file_path: FilePathString, content) {
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
