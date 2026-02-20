import fs from 'fs';
import type {SourcePathString} from '@razomy/path-string';

export function isExist(filePath: SourcePathString) {
  return fs.existsSync(filePath);
}
