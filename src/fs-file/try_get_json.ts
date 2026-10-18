import fs from 'fs';
import * as fsFile from '@razomy/fs-file';

export function tryGetJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fsFile.getJson(filePath);
}
