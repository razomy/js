import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function getSync(filePath: abstractions.fs.FilePath) {
  return fs.readFileSync(filePath, 'utf8');
}
