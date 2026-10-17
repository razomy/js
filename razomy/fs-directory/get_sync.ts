import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function getSync(dirPath: abstractions.fs.DirPath): string[] {
  return fs.readdirSync(dirPath);
}
