import fs from 'fs';
import type {DirPathString} from '@razomy/path-string';

export function get(dirPath: DirPathString): string[] {
  return fs.readdirSync(dirPath)
}


