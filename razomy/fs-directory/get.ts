import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function get(dirPath: abstracts.graphs.DirPathString): string[] {
  return fs.readdirSync(dirPath);
}
