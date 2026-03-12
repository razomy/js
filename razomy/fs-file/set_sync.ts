import fs from 'fs';
import type { FilePathString } from '@razomy/abstracts/graphs';

export function setSync(filePath: FilePathString, content: string) {
  return fs.writeFileSync(filePath, content, 'utf8');
}
