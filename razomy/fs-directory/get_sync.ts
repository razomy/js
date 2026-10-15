import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function getSync(dirPath: abstractions.components.DirPathString): string[] {
  return fs.readdirSync(dirPath);
}
