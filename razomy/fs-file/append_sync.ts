import fs from 'fs';
import type { FilePathString } from '@razomy/abstracts/graphs';

export function appendSync(filePath: FilePathString, content: string) {
  fs.appendFileSync(filePath, content, 'utf8');
}
