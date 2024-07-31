import fs from 'fs';
import path from 'path';
import {LeafBranchDict} from 'razomy.js/trees/leaf_tree';

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

export function createFilesRecursiveFromDict(directory: string, dict: LeafBranchDict<Buffer>) {
  for (const key in dict) {
    const value = dict[key];
    const itemPath = path.join(directory, key);
    if (value.isLeaf) {
      fs.writeFileSync(itemPath, value.value)
    } else {
      createDirectoryIfNotExists(itemPath)
      createFilesRecursiveFromDict(itemPath, value.children);
    }
  }
}
