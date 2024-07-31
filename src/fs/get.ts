import fs from 'fs';
import path from 'path';
import {LeafBranchDict} from 'razomy.js/trees/leaf_tree';

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

export function getFilesRecursiveToDict(directory: string) {
  let files: LeafBranchDict<Buffer> = {};

  const items = fs.readdirSync(directory);
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile()) {
      const data = fs.readFileSync(itemPath);
      files[item] = {
        value: data,
        isLeaf: true
      };
    } else if (stat.isDirectory()) {
      files[item] = {
        isLeaf: false,
        children: getFilesRecursiveToDict(itemPath)
      };
    }
  }
  return files;
}
