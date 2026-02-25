import fs from 'fs';
import type { FilePathString } from '@razomy/path-string';

export function setSync(filePath: FilePathString, content: string) {
  return fs.writeFileSync(filePath, content, 'utf8');
}

export function appendSync(filePath: FilePathString, content: string) {
  fs.appendFileSync(filePath, content, 'utf8');
}
