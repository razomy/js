import fs from 'fs';
import type { FilePathString } from '@razomy/path-string';

export function appendSync(filePath: FilePathString, content: string) {
  fs.appendFileSync(filePath, content, 'utf8');
}
