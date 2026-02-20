import fs from 'fs';
import type {FilePathString} from '@razomy/path-string';

export function getSync(filePath: FilePathString) {
  return fs.readFileSync(filePath, 'utf8');
}
