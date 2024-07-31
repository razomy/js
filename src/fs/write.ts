import fs from "fs";
import {createPathIfNotExistsRecursive} from "razomy.js/fs/create";

export function writeFile(filePath, content) {
  createPathIfNotExistsRecursive(filePath);
  return fs.writeFileSync(filePath, content, 'utf8');
}

export function writeFileJson(filePath, content) {
  createPathIfNotExistsRecursive(filePath);
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
