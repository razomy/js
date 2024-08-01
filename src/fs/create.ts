import fs from 'fs';
import path from 'path';
import {DictBranch, DictRoot} from 'razomy.js/trees/dict_tree';

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

export function createFilesRecursiveFromDict(absolute_path: string, dict: DictRoot<Buffer>) {
  createDirectoryIfNotExists(absolute_path)
  for (const key in dict.children) {
    const value = dict[key];
    const item_absolute_path = path.join(absolute_path, key);
    if ('children' in value) {
      createFilesRecursiveFromDict(item_absolute_path, value);
    } else {
      fs.writeFileSync(item_absolute_path, value.value)
    }
  }
}
