import fs from 'fs';
import {SourcePath} from "razomy.js/fs/path";

export function readFile(file_path) {
  return fs.readFileSync(file_path, 'utf8');
}

export function readFileAsync(file_path) {
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

export function readFileJson(file_path) {
  return JSON.parse(fs.readFileSync(file_path, 'utf8'));
}

export function tryReadFileJson(file_path) {
  if (!fs.existsSync(file_path)) {
    return null;
  }
  return readFileJson(file_path);
}

export function is_exist(file_path: SourcePath) {
  return fs.existsSync(file_path);
}