import fs from 'fs';
import * as fsFile from '@razomy/fs-file';

export function tryGetSync(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fsFile.getSync(filePath);
}
