import fs from 'fs';
import path from 'path';
import {DictBranch, DictLeaf, DictRoot} from 'razomy.js/trees/dict_tree';
import {ArgumentException} from "razomy.js/exceptions/argument_exception";

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

export function getFilesRecursiveToDict(parent: DictRoot<Buffer>, directory: string) {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return {
      parent: parent,
      value: data,
    } as DictLeaf<Buffer>;
  } else if (stat.isDirectory()) {
    let files: DictBranch<Buffer> = {
      parent: parent,
      value: directory,
      children: {}
    };
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      files[itemPath] = getFilesRecursiveToDict(parent, itemPath);
    }
    return files;
  } else {
    throw new ArgumentException('unkown file type', directory)
  }
}
