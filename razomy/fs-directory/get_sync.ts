import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function getSync(dirPath: abstracts.domains.DirPathString): string[] {
  return fs.readdirSync(dirPath);
}
