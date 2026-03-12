import fs from 'fs';
import type { FilePathString } from '@razomy/abstracts/graphs';

export function setJson(filePath: FilePathString, content, isFormat: boolean = false) {
  return fs.writeFileSync(filePath, JSON.stringify(content, null, isFormat ? 2 : 0), 'utf8');
}
