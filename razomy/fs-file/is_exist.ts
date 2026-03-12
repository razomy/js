import fs from 'fs';
import type { SourcePathString } from '@razomy/abstracts/graphs';

export function isExist(filePath: SourcePathString) {
  return fs.existsSync(filePath);
}
