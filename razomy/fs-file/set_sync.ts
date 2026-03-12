import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function setSync(filePath: abstracts.graphs.FilePathString, content: string) {
  return fs.writeFileSync(filePath, content, 'utf8');
}
