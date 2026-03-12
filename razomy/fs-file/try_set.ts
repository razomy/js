import fs from 'fs';
import { tryCreate } from '@razomy/fs-directory';
import * as path from 'path';
import type { FilePathString } from '@razomy/abstracts/graphs';

export function trySet(filePath: FilePathString, content) {
  tryCreate(path.dirname(filePath));
  return fs.writeFileSync(filePath, content, 'utf8');
}
