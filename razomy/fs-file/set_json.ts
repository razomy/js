import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function setJson(filePath: abstracts.graphs.FilePathString, content, isFormat: boolean = false) {
  return fs.writeFileSync(filePath, JSON.stringify(content, null, isFormat ? 2 : 0), 'utf8');
}
