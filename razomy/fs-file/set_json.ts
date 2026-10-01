import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function setJson(filePath: abstracts.domains.FilePathString, content, isFormat: boolean = false) {
  const data = isFormat ? JSON.stringify(content, null, 2) + '\n' : JSON.stringify(content, null, 0);
  return fs.writeFileSync(filePath, data, 'utf8');
}
