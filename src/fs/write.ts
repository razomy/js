import fs from 'fs';
import {createDirectoryIfNotExists} from 'razomy.js/fs/create';
import path from "path";

export function tryWriteFile(filePath, content) {
  createDirectoryIfNotExists(path.dirname(filePath));
  return fs.writeFileSync(filePath, content, 'utf8');
}

export function writeFile(filePath, content) {
  return fs.writeFileSync(filePath, content, 'utf8');
}

export function writeFileJson(filePath, content) {
  return fs.writeFileSync(filePath, JSON.stringify(content), 'utf8');
}

export function writeToFileAsync(filePath, content) {
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
