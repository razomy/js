import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import {isObject} from "razomy.js/dict/get-first-key";

export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

export function deleteFile(filePath) {
  return fs.rmSync(filePath);
}

export function readFileJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function tryReadFileJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readFileJson(filePath);
}

export function writeFile(filePath, content) {
  createPathIfNotExistsRecursive(filePath);
  return fs.writeFileSync(filePath, content, 'utf8');
}

export function writeFileJson(filePath, content) {
  createPathIfNotExistsRecursive(filePath);
  return fs.writeFileSync(filePath, JSON.stringify(content), 'utf8');
}

export const createDirectoryIfNotExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Directory created: ${directoryPath}`);
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
};

export function createPathIfNotExistsRecursive(filePath) {
  const dirname = path.dirname(filePath);

  if (!fs.existsSync(dirname)) {
    createPathIfNotExistsRecursive(dirname);
    fs.mkdirSync(dirname);
  }
}


export const clearDirectoryAsync = async (directoryPath) => {
  try {
    await fsExtra.emptyDir(directoryPath);
    console.log(`Directory cleared: ${directoryPath}`);
  } catch (error) {
    console.error(`Error clearing directory: ${directoryPath}`);
    console.error(error);
  }
};


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

export function readFileFileAsync(filePath) {
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

export function waitAsync(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds); // or you can use reject() to reject the promise
    }, seconds); // convert seconds to milliseconds
  });
}

export function getAllFilesInDirectoryFlat(directory) {
  let files: string[] = [];

  function walk(currentDirPath) {
    const items = fs.readdirSync(currentDirPath);

    for (const item of items) {
      const itemPath = path.join(currentDirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isFile()) {
        files.push(itemPath);
      } else if (stat.isDirectory()) {
        walk(itemPath);
      }
    }
  }

  walk(directory);
  return files;
}

export type Recursive<T> = { [key: string]: Recursive<T> | T }

export function getFilesRecursiveToDict(directory: string) {
  let files: Recursive<string> = {};

  const items = fs.readdirSync(directory);
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile()) {
      const data = fs.readFileSync(itemPath).toString('base64');
      files[item] = data;
    } else if (stat.isDirectory()) {
      files[item] = getFilesRecursiveToDict(itemPath);
    }
  }
  return files;
}

export function createFilesRecursiveFromDict(directory: string, dict: Recursive<string>) {
  for (const key in dict) {
    const value = dict[key];
    const itemPath = path.join(directory, key);
    if (isObject(value)) {
      createDirectoryIfNotExists(itemPath)
      createFilesRecursiveFromDict(itemPath, value as Recursive<string>);
    } else {
      fs.writeFileSync(itemPath, Buffer.from(value as string, 'base64'))
    }
  }
}

