import fs from 'fs';
import type { FilePathString } from '@razomy/abstracts/graphs';

export function getSync(filePath: FilePathString) {
  return fs.readFileSync(filePath, 'utf8');
}
