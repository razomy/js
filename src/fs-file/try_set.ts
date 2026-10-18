import fs from 'fs';
import * as path from 'path';
import * as fsDirectory from '@razomy/fs-directory';
import * as abstractions from '@razomy/abstractions';

export function trySet(filePath: abstractions.fs.FilePath, content) {
  fsDirectory.tryCreate(path.dirname(filePath));
  return fs.writeFileSync(filePath, content, 'utf8');
}
