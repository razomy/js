import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function getSync(filePath: abstractions.components.FilePathString) {
  return fs.readFileSync(filePath, 'utf8');
}
