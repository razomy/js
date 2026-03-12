import fs from 'fs';
import * as path from 'path';
import * as fsDirectory from '@razomy/fs-directory';
import * as abstracts from '@razomy/abstracts';

export function trySet(filePath: abstracts.graphs.FilePathString, content) {
  fsDirectory.tryCreate(path.dirname(filePath));
  return fs.writeFileSync(filePath, content, 'utf8');
}
